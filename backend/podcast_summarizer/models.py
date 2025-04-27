import openai
import requests
import json
from decouple import config
from pathlib import Path
from openai import OpenAI
import os

# ----- LLMs ----- 
# System prompts for different LLM tasks
SUMMARIZER_SYSTEM_PROMPT_ONE_NARRATOR = (
    "You are a professional podcaster. Your task is to read through what people are saying in articles, social media threads, etc, and summarize it in the form of a solo podcast. "
    "The user will give you these articles and threads in the form of plaintext. Do not respond directly to the user, but instead create a podcast script that summarizes the content given. "
    "Speak in an engaging and conversational tone, as if you are narrating directly to your audience. "
    "Highlight the key points of the articles, social media threads, etc, provide context, and add your own commentary to make it interesting."
    "Make sure that the podcast tone, humor and style is similar to the input articles, social media threads, etc. For example, even if the input is edgy and extreme, keep that tone."
    "Make sure the podcast is approximately 5 minutes long."
    "Don't insert and stagehand directions or parenthetical. Only include speaker, then the dialogue text."
    "Here are some config options to follow (from a scale of 0 to 1 with 1 being strongest): Humor: 0.1, Outside info (introduce information not given by the user): 0.5"
)

SUMMARIZER_SYSTEM_PROMPT_TWO_NARRATOR = (
    "You are a professional podcaster hosting a two-person podcast. Your task is to read through what people are saying in articles, social media threads, etc, and summarize it in the form of a discussion between two hosts." 
    "The user will give you these articles and threads in the form of plaintext. Do not respond directly to the user, but instead create a podcast script that summarizes the content given. "
    "One host should take the lead in presenting the key points of the articles, social media threads, etc, "
    "while the other host asks questions, provides commentary, and adds humor or insights to make the discussion lively and engaging."
    "Make sure that the podcast tone, humor and style is similar to the input articles, social media threads, etc. For example, even if the input is edgy and extreme, keep that tone."
    "Make sure the podcast is approximately 5 minutes long."
    "Don't insert and stagehand directions or parentheticals. Only include speaker, then the dialogue text."
    "Here are some config options to follow (from a scale of 0 to 1 with 1 being strongest): Humor: 0.1, Outside info (introduce information not given by the user): 0.5"
)

def call_openai_chat(system_prompt, user_prompt, model="gpt-4o", max_tokens=150, temperature=0.7, top_p=1.0):
    try:
        openai.api_key = config('OPENAI_API_KEY')
        response = openai.Completion.create(
            engine=model,
            prompt=f"{system_prompt}\nHere is the user prompt:\n{user_prompt}",
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p #top_p decides how many words to consider
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error: {e}"

def call_llama3_chat(system_prompt, user_prompt, max_tokens=150, temperature=0.7, top_p=1.0):
    try:
        url = "http://localhost:11434/api/generate"
        payload = {
            "model": "llama3.1:8b",
            "prompt": f"{system_prompt}\nHere is the user prompt:\n{user_prompt}",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "top_p": top_p
        }
        response = requests.post(url, json=payload, stream=True)
        response.raise_for_status()
        full_text = ""
        for line in response.iter_lines(decode_unicode=True):
            if line:  # Ensure the line is not empty
                # Parse the JSON object in the line
                data = json.loads(line)
                # Concatenate the response text from the chunk
                full_text += data.get("response", "")

        print("Final concatenated response:")
        print(full_text)
        return strip_to_json(full_text)
    except Exception as e:
        return f"Error: {e}"

def strip_to_json(text):
    """
    Returns the first complete JSON object in the text by extracting the content
    from the first "{" to the last "}".
    """
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start:end+1]
    return ""

# ----- TTS -----
def call_xtts_silly_cavern(text, speaker="en_speaker_9", output_path=None, language="en", speed=1.0):
    """
    Generates speech from text using the XTTS silly cavern model.
    
    Args:
        text (str): The text to convert to speech
        speaker (str): The speaker voice to use
        output_path (str): Path to save the audio file (if None, returns audio data)
        language (str): The language code (default: "en")
        speed (float): Speech speed multiplier
        
    Returns:
        str or bytes: Path to saved audio file or audio data
    """
    try:
        url = "http://localhost:8000/tts"  # Adjust URL based on your XTTS silly cavern deployment
        
        payload = {
            "text": text,
            "speaker": speaker,
            "language": language,
            "speed": speed
        }
        
        response = requests.post(url, json=payload)
        response.raise_for_status()
        
        if output_path:
            # Save audio file to the specified path
            with open(output_path, "wb") as f:
                f.write(response.content)
            return output_path
        else:
            # Return audio data directly
            return response.content
            
    except Exception as e:
        return f"TTS Error: {e}"

def call_openai_tts(text, voice="alloy", output_path=None, model="gpt-4o-mini-tts", speed=1.0, instructions=None):
    """
    Generates speech from text using OpenAI's latest TTS model.
    
    Args:
        text (str): The text to convert to speech
        voice (str): Voice to use (options: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer)
        output_path (str): Path to save the audio file (if None, returns audio data)
        model (str): TTS model to use ("gpt-4o-mini-tts", "tts-1" or "tts-1-hd")
        speed (float): Speech speed multiplier (0.25 to 4.0)
        instructions (str, optional): Special instructions for speaking the text
        
    Returns:
        str or bytes: Path to saved audio file or audio data
    """
    try:
        # Create OpenAI client with API key
        client = OpenAI(api_key=config('OPENAI_API_KEY'))
        
        # Prepare the parameters for the API call
        params = {
            "model": model,
            "voice": voice,
            "input": text
        }
        
        # Add instructions if provided
        if instructions:
            params["instructions"] = instructions
            
        if output_path:
            # Create a Path object for the output file
            speech_file_path = Path(output_path)
            
            # Stream the response directly to file
            with client.audio.speech.with_streaming_response.create(**params) as response:
                response.stream_to_file(speech_file_path)
                
            return output_path
        else:
            # Return the audio data directly
            response = client.audio.speech.create(**params)
            return response.content
            
    except Exception as e:
        return f"OpenAI TTS Error: {e}"

def call_openai_tts_via_rest(
    text: str,
    voice: str = "alloy",
    output_path: str | None = None,
    model: str = "gpt-4o-mini-tts",
    speed: float = 1.0,
    instructions: str | None = None,
) -> str | bytes:
    """
    Generates speech by calling the OpenAI TTS REST endpoint directly.

    Args:
        text (str): The text to convert to speech.
        voice (str): Voice to use (alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer).
        output_path (str|None): Where to save the MP3 file. If None, returns raw bytes.
        model (str): TTS model (“gpt-4o-mini-tts”, “tts-1”, or “tts-1-hd”).
        speed (float): Speech speed multiplier (0.25–4.0).
        instructions (str|None): Custom instructions for the voice.

    Returns:
        str: Path to the saved file (if output_path given), or
        bytes: Raw MP3 data.
    """
    api_key = config('OPENAI_API_KEY')
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY environment variable is not set.")

    url = "https://api.openai.com/v1/audio/speech"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "voice": voice,
        "input": text,
        "speed": speed,
        # Note: response_format defaults to “mp3” if streaming,
        # but we’ll set it explicitly when not streaming.
    }
    if instructions:
        payload["instructions"] = instructions

    if output_path:
        # Stream the MP3 response to a file
        response = requests.post(url, headers=headers, json=payload, stream=True)
        response.raise_for_status()
        output_file = Path(output_path)
        with output_file.open("wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        return str(output_file)
    else:
        # Return raw MP3 bytes
        # (we set response_format to mp3 so the API knows to return binary)
        payload["response_format"] = "mp3"
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return response.content
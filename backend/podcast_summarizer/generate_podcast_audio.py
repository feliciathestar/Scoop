import os
import sys
from models import call_openai_tts_via_rest, call_xtts_silly_cavern

def read_podcast_script(file_path):
    """Read the podcast script from a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)

def parse_script_single_speaker(script):
    """
    Parse a script with a single speaker without explicit speaker indicators.
    Breaks the text into manageable segments for TTS processing.
    
    Args:
        script (str): The podcast script content
        
    Returns:
        list: A list of segments, each being a dict with "speaker" and "text" keys
    """
    # Split by paragraphs (empty lines)
    paragraphs = [p.strip() for p in script.split('\n\n') if p.strip()]
    segments = []
    
    # Maximum character length for each segment
    # Limiting segment size to avoid TTS limitations
    max_segment_length = 1000
    
    for paragraph in paragraphs:
        # If the paragraph is too long, break it into smaller segments
        if len(paragraph) > max_segment_length:
            # Break by sentences (roughly)
            sentences = []
            # Split by common sentence endings followed by a space and capital letter
            for part in paragraph.replace('. ', '.|').replace('? ', '?|').replace('! ', '!|').split('|'):
                if part:
                    sentences.append(part)
            
            current_segment = ""
            for sentence in sentences:
                # If adding this sentence would make the segment too long
                if len(current_segment) + len(sentence) > max_segment_length and current_segment:
                    segments.append({
                        "speaker": "Host",
                        "text": current_segment.strip()
                    })
                    current_segment = sentence
                else:
                    if current_segment:
                        current_segment += " " + sentence
                    else:
                        current_segment = sentence
            
            # Add the last segment if there's any text left
            if current_segment:
                segments.append({
                    "speaker": "Host",
                    "text": current_segment.strip()
                })
        else:
            # Paragraph is short enough to be a segment on its own
            segments.append({
                "speaker": "Host",
                "text": paragraph
            })
    
    return segments

def parse_script_multi_speaker(script):
    """Parse the script to separate by speaker."""
    lines = script.split('\n')
    segments = []
    current_speaker = None
    current_text = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("Host 1:") or line.startswith("Host 2:"):
            # Save previous segment if it exists
            if current_speaker and current_text:
                segments.append({
                    "speaker": current_speaker,
                    "text": " ".join(current_text)
                })
            
            # Start new segment
            current_speaker = "Host 1" if line.startswith("Host 1:") else "Host 2"
            # Extract text after the colon and strip any leading/trailing whitespace
            current_text = [line[line.find(":") + 1:].strip()]
        else:
            # Continue with current segment
            if current_speaker is not None:  # Only append if we've already started a segment
                current_text.append(line)
    
    # Add the last segment
    if current_speaker and current_text:
        segments.append({
            "speaker": current_speaker,
            "text": " ".join(current_text)
        })
    
    return segments

def generate_audio_openai(segments, output_folder="output_audio"):
    """Generate audio using OpenAI TTS for each segment."""
    os.makedirs(output_folder, exist_ok=True)
    audio_files = []
    
    # Voice customization options
    host_voices = {
        "Host 1": {
            "voice": "ash",  # Using coral for Host 1
            "instructions": "Speak casually, like two friend conversing with each other over lunch. Don't overdo emotions. Speak at an overall faster rate."
        },
        "Host 2": {
            "voice": "nova",  # Using nova for Host 2
            "instructions": "Speak in a casual and curious tone with good humor. React naturally to the other host's points. Don't overdo emotions. Speak at an overall faster rate."
        }
    }
    
    for i, segment in enumerate(segments):
        # Get voice settings for the current speaker
        voice_settings = host_voices.get(segment["speaker"], {"voice": "onyx", "instructions": "Speak casually, like two friend conversing with each other over lunch. Don't overdo emotions. Speak at an overall faster rate."})
        
        output_path = os.path.join(output_folder, f"segment_{i:03d}.mp3")
        print(f"Generating audio for {segment['speaker']} (segment {i+1}/{len(segments)})...")
        
        try:
            # Generate audio for this segment with the new TTS model
            result = call_openai_tts_via_rest(
                text=segment["text"],
                voice=voice_settings["voice"],
                output_path=output_path,
                model="gpt-4o-mini-tts",  # Using the new model
                instructions=voice_settings["instructions"]
            )
            
            if isinstance(result, str) and result.startswith("OpenAI TTS Error"):
                print(f"Error generating audio for segment {i}: {result}")
                continue
                
            audio_files.append(output_path)
            print(f"✓ Saved segment {i+1} to {output_path}")
            
        except Exception as e:
            print(f"Error generating audio for segment {i}: {e}")
    
    return audio_files

def generate_audio_xtts(segments, output_folder="output_audio"):
    """Generate audio using XTTS for each segment."""
    os.makedirs(output_folder, exist_ok=True)
    audio_files = []
    
    for i, segment in enumerate(segments):
        # Use different speakers for different hosts
        speaker = "en_speaker_9" if segment["speaker"] == "Host 1" else "en_speaker_6"
        
        output_path = os.path.join(output_folder, f"segment_{i:03d}.wav")
        print(f"Generating audio for {segment['speaker']} (segment {i+1}/{len(segments)})...")
        
        try:
            # Generate audio for this segment
            result = call_xtts_silly_cavern(
                text=segment["text"],
                speaker=speaker,
                output_path=output_path
            )
            
            if isinstance(result, str) and result.startswith("TTS Error"):
                print(f"Error generating audio for segment {i}: {result}")
                continue
                
            audio_files.append(output_path)
            print(f"✓ Saved segment {i+1} to {output_path}")
            
        except Exception as e:
            print(f"Error generating audio for segment {i}: {e}")
    
    return audio_files

def combine_audio_files(audio_files, output_path, file_type="mp3"):
    """
    Combines multiple audio files into a single file.
    Note: This requires ffmpeg to be installed on your system.
    """
    try:
        # Check if ffmpeg is available
        import subprocess
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Create a text file with file paths for ffmpeg
        list_file = os.path.join(os.path.dirname(audio_files[0]), "file_list.txt")
        with open(list_file, "w") as f:
            for audio_file in audio_files:
                f.write(f"file '{os.path.abspath(audio_file)}'\n")
        
        # Use ffmpeg to concatenate the files
        cmd = [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", 
            "-i", list_file, "-c", "copy", output_path
        ]
        
        subprocess.run(cmd, check=True)
        print(f"✓ Combined audio saved to: {output_path}")
        
        # Clean up the list file
        os.remove(list_file)
        
        return output_path
    except Exception as e:
        print(f"Error combining audio files: {e}")
        print("Note: Combining audio files requires ffmpeg to be installed.")
        print("Individual segment files are still available in the output folder.")
        return None

def main():
    # Get current script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # File paths
    script_path = os.path.join(script_dir, "two_podcast.txt")  # Default to two_podcast.txt
    
    # Check if a specific podcast file is provided as an argument
    if len(sys.argv) > 1 and sys.argv[1] in ["one", "two"]:
        script_path = os.path.join(script_dir, f"{sys.argv[1]}_podcast.txt")
    
    output_folder = os.path.join(script_dir, "output_audio")
    
    # Check if the file exists
    if not os.path.exists(script_path):
        print(f"Error: The podcast script file '{script_path}' does not exist.")
        sys.exit(1)
    
    # Read the script
    print(f"Reading podcast script from: {script_path}")
    script = read_podcast_script(script_path)
    
    # Determine which parser to use based on the filename
    is_single_speaker = "one_podcast.txt" in script_path
    
    if is_single_speaker:
        print("Detected single-speaker format, using single speaker parser...")
        segments = parse_script_single_speaker(script)
    else:
        print("Detected multi-speaker format, using multi-speaker parser...")
        segments = parse_script_multi_speaker(script)
    
    if not segments:
        print("Error: No segments found in the podcast script. Check the format.")
        sys.exit(1)
    
    print(f"Found {len(segments)} segments to process.")
    print("Note: This script uses AI-generated voices. The audio you will hear is not human, but computer-generated.")
    
    # Choose which TTS service to use
    use_openai = True  # Set to False to use XTTS instead
    
    try:
        if use_openai:
            print("Using OpenAI TTS service with gpt-4o-mini-tts model...")
            audio_files = generate_audio_openai(segments, output_folder)
            file_type = "mp3"
        else:
            print("Using XTTS service...")
            audio_files = generate_audio_xtts(segments, output_folder)
            file_type = "wav"
        
        # Check if we have any audio files
        if not audio_files:
            print("No audio files were generated. Check the errors above.")
            sys.exit(1)
        
        print(f"Generated {len(audio_files)} audio segments")
        print(f"Audio files saved to: {os.path.abspath(output_folder)}")
        
        # Ask user if they want to combine the audio files
        try:
            response = input("Do you want to combine all segments into a single podcast file? (y/n): ")
            if response.lower() == 'y':
                combined_path = os.path.join(output_folder, f"complete_podcast.{file_type}")
                combine_audio_files(audio_files, combined_path, file_type)
        except KeyboardInterrupt:
            print("\nSkipping audio combination.")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
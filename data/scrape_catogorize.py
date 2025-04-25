from bs4 import BeautifulSoup
import re
import pandas as pd
import os

# concatenate multiple text files into a single output file
def combine_txt_files(input_files, output_file):
    """
    Concatenate multiple text files into a single output file
    
    Args:
        input_files (list): List of input file paths
        output_file (str): Path to the output file
    """
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for fname in input_files:
            try:
                with open(fname, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
                    # Add a newline between files to separate content
                    outfile.write('\n')
            except Exception as e:
                print(f"Error processing {fname}: {str(e)}")

# Example usage
folder_path = "/Users/wanxinxiao/Desktop/Scoop/data/@asharora"  # Adjust this path based on your current working directory
input_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.txt')]
output_file = "combined_tweets.txt"
combine_txt_files(input_files, output_file)

# Load HTML
with open("combined_tweets.txt", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Find all tweets
tweets = soup.find_all("article", {"role": "article"})
data = []

for tweet in tweets:
    # --- Main tweet text ---
    main = tweet.find("div", {"data-testid": "tweetText"})
    tweet_text = main.get_text(separator=" ", strip=True) if main else ""

    # --- Collect all <span class=...> ---
    spans = tweet.find_all("span", class_=True)
    span_texts = [s.get_text(strip=True) for s in spans if s.get_text(strip=True)]

    # --- Use main tweet text to split embedded text ---
    embedded_text = ""
    if tweet_text:
        try:
            idx = span_texts.index(tweet_text.strip())
            embedded_spans = span_texts[idx+1:]  # everything after the main tweet
        except ValueError:
            embedded_spans = span_texts
    else:
        embedded_spans = span_texts

    # Filter short spans (emojis, etc.)
    embedded_spans = [s for s in embedded_spans if len(s) > 1]
    embedded_text = " ".join(embedded_spans).strip()

    # --- Extract hashtags and usernames ---
    all_text = f"{tweet_text} {embedded_text}"
    hashtags = list(set(re.findall(r"#\w+", all_text)))
    usernames = list(set(re.findall(r"@\w+", all_text)))

    # Clean embedded_text: remove everything before first "@"
    if "@" in embedded_text:
        embedded_text = embedded_text.split("@", 1)[1]  # everything after first "@"
        embedded_text = "@" + embedded_text  # restore the @ symbol

    # separate the first word containing @ from the rest in column embedded_text, 
    # put the rest in a new column
    if " " in embedded_text:
        first_word, rest = embedded_text.split(" ", 1)
        retweeted_from = first_word
        retweeted_content = rest.strip()
    else:
        retweeted_from = embedded_text
        retweeted_content = ""

    data.append({
        "tweet_text": tweet_text,
        "retweeted_from": retweeted_from,
        "retweeted_content": retweeted_content,
        "hashtags": hashtags,
        "usernames": usernames,
    })

# Convert to DataFrame
df = pd.DataFrame(data)

# Fix: remove duplicates using columns that actually exist in the DataFrame
df = df.drop_duplicates(subset=["tweet_text", "retweeted_from"], keep="first")
print(df.head())
# Save to CSV
df.to_csv("feed-tweets@asharoraa.csv", index=False)



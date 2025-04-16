from bs4 import BeautifulSoup
import re
import pandas as pd

# Load HTML
with open("#bitcoin.txt", "r", encoding="utf-8") as f:
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

    data.append({
        "tweet_text": tweet_text,
        "embedded_text": embedded_text,
        "hashtags": hashtags,
        "usernames": usernames
    })

# Convert to DataFrame
df = pd.DataFrame(data)

# remove duplicates
df = df.drop_duplicates(subset=["tweet_text", "embedded_text"], keep="first")
print(df.head())
# Save to CSV
df.to_csv("tweets.csv", index=False)



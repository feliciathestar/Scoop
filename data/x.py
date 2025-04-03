import requests
import json

def scrape_twitter_posts(username, num_posts=5):
    url = f"https://syndication.twitter.com/srv/timeline-profile/screen-name/{username}"
    
    # Set headers to mimic a browser request
    r = requests.get(url)
    html = r.text
    
    # Extract the JSON data from the HTML
    start_str = '<script id="__NEXT_DATA__" type="application/json">'
    end_str = '</script></body></html>'
    
    # Find the start and end of the JSON data
    start_index = html.index(start_str) + len(start_str)
    end_index = html.index(end_str, start_index)
    
    # Extract the JSON string and parse it
    json_str = html[start_index: end_index]
    data = json.loads(json_str)
    
    # Extract the timeline entries
    entries = data["props"]["pageProps"]["timeline"]["entries"]
    
    # Filter the entries to get only tweets
    posts = []
    count = 0
    
    for entry in entries:
        # Check if the entry contains a tweet
        if "content" in entry and "tweet" in entry["content"]:
            tweet = entry["content"]["tweet"]
            tweet_text = tweet.get("full_text", "")
            
            # You can extract more information if needed
            tweet_id = tweet.get("id_str", "")
            created_at = tweet.get("created_at", "")
            
            posts.append({
                "id": tweet_id,
                "text": tweet_text,
                "created_at": created_at
            })
            
            count += 1
            if count >= num_posts:
                break
    
    return posts

# Example usage
username = "elonmusk"
posts = scrape_twitter_posts(username, 10)  # Get 10 posts

# Print the posts
for i, post in enumerate(posts, 1):
    print(f"\n--- Post {i} ---")
    print(f"Created at: {post['created_at']}")
    print(f"Text: {post['text']}")
    print(f"ID: {post['id']}")
    print("-" * 40)
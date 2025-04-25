import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# === Step 1: Load datasets ===
preferred = pd.read_csv("tweets@asharoraa.csv")     # CSV with tweets user liked
all_tweets = pd.read_csv("feed-tweets@asharoraa.csv")          # CSV with candidate tweets

# === Step 2: Preprocessing ===
preferred['combined'] = preferred['combined'].fillna('')
all_tweets['combined'] = all_tweets['combined'].fillna('')

# === Step 3: Combine preferred tweets into one string ===
user_profile = ' '.join(preferred['combined'].tolist())

# === Step 4: Vectorize user profile and all candidate tweets ===
# Combine all text for vectorization
combined_text = [user_profile] + all_tweets['combined'].tolist()

vectorizer = TfidfVectorizer(stop_words='english')
vectorized = vectorizer.fit_transform(combined_text)

# === Step 5: Compute cosine similarity ===
# First row is user profile, rest are candidate tweets
similarities = cosine_similarity(vectorized[0:1], vectorized[1:]).flatten()

# === Step 6: Attach scores to tweets and get top recommendations ===
all_tweets['similarity_score'] = similarities
top_recommendations = all_tweets.sort_values(by='similarity_score', ascending=False).head(100)  # Changed from 10 to 50

# === Step 7: Output the results ===
print("Top 50 Tweet Recommendations Based on User Profile:\n")
print(top_recommendations[['combined', 'similarity_score']])
# Save to CSV
top_recommendations.to_csv("recommended_tweets.csv", index=False)


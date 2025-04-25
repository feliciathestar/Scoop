import pandas as pd
import re

# Load the uploaded CSV
file_path = "feed-tweets@asharoraa.csv"
df = pd.read_csv(file_path)

if 'retweeted_from' in df.columns:
    # Create a mask for rows where retweeted_from doesn't contain @
    invalid_retweets_mask = ~df['retweeted_from'].apply(
        lambda x: isinstance(x, str) and '@' in x
    )
    
    # Clear both columns for those rows
    df.loc[invalid_retweets_mask, 'retweeted_from'] = ''
    
    if 'retweeted_content' in df.columns:
        df.loc[invalid_retweets_mask, 'retweeted_content'] = ''

# --- Check for high similarity between tweet_text and retweeted_content ---
if 'tweet_text' in df.columns and 'retweeted_content' in df.columns:
    
    def find_consecutive_words(text1, text2, n=10):
        """Checks if text1 and text2 share n consecutive words."""
        if not isinstance(text1, str) or not isinstance(text2, str):
            return False
        words1 = text1.split()
        words2 = text2.split()
        if len(words1) < n or len(words2) < n:
            return False
        
        # Create sets of n-grams for faster lookup
        ngrams1 = {" ".join(words1[i:i+n]) for i in range(len(words1) - n + 1)}
        ngrams2 = {" ".join(words2[i:i+n]) for i in range(len(words2) - n + 1)}
        
        # Check for intersection
        return not ngrams1.isdisjoint(ngrams2)

    def check_similarity_and_clear(row):
        """Checks similarity conditions and returns content or empty string."""
        tweet_text = row['tweet_text']
        retweeted_content = row['retweeted_content']
        
        # Ensure both are valid strings before proceeding
        if not isinstance(tweet_text, str) or not isinstance(retweeted_content, str) or not retweeted_content:
            return retweeted_content # Return original if invalid or empty

        words1 = tweet_text.split()
        words2 = retweeted_content.split()
        
        # Condition 1: Word count difference <= 10
        word_count_similar = abs(len(words1) - len(words2)) <= 10
        
        # Condition 2: 10 consecutive words match
        consecutive_match = find_consecutive_words(tweet_text, retweeted_content, n=10)
        
        # If both conditions met, clear retweeted_content
        if word_count_similar and consecutive_match:
            return ''
        else:
            return retweeted_content # Otherwise, keep original

    # Apply the function to update 'retweeted_content'
    df['retweeted_content'] = df.apply(check_similarity_and_clear, axis=1)
    
    def remove_identical_prefix(row):
        """Remove identical word sequence at the beginning of tweet_text and retweeted_content."""
        tweet_text = row['tweet_text']
        retweeted_content = row['retweeted_content']
        
        # Skip if either is not a valid string or retweeted_content is empty
        if not isinstance(tweet_text, str) or not isinstance(retweeted_content, str) or not retweeted_content:
            return retweeted_content
            
        tweet_words = tweet_text.split()
        retweeted_words = retweeted_content.split()
        
        # Find where the sequences start to differ
        common_prefix_length = 0
        for i in range(min(len(tweet_words), len(retweeted_words))):
            if tweet_words[i] == retweeted_words[i]:
                common_prefix_length = i + 1
            else:
                break
        
        # If there's a common prefix, remove it from retweeted_content
        if common_prefix_length > 0:
            return ' '.join(retweeted_words[common_prefix_length:])
        else:
            return retweeted_content
    
    # Apply the function to update 'retweeted_content'
    df['retweeted_content'] = df.apply(remove_identical_prefix, axis=1)


# Remove all '@' symbols from all string entries (Consider if you still need this after the above)
df = df.map(lambda x: x.replace('@', '') if isinstance(x, str) else x)

# Remove all '#' symbols from all string entries
df = df.map(lambda x: x.replace('#', '') if isinstance(x, str) else x)

# Remove all '...' symbols from all string entries
df = df.map(lambda x: x.replace('...', '') if isinstance(x, str) else x)

# convert all string entries to lowercase
df = df.map(lambda x: x.lower() if isinstance(x, str) else x)

# Remove all non-alphanumeric characters from all string entries
df = df.map(lambda x: re.sub(r'[^a-zA-Z0-9\s]', '', x) if isinstance(x, str) else x)

# Remove all leading and trailing whitespace from all string entries
df = df.map(lambda x: x.strip() if isinstance(x, str) else x)

# Remove all empty strings from all string entries
df = df.map(lambda x: '' if isinstance(x, str) and x == '' else x)

# append each column to a new column
df['combined'] = df.apply(lambda x: ' '.join(x.dropna().astype(str)), axis=1)

# remove empty strings from the combined column
df['combined'] = df['combined'].replace('', pd.NA)
df = df.dropna(subset=['combined'])

# remove duplicates
df = df.drop_duplicates(subset=['combined'], keep='first')

# remove all new lines from all string entries
df = df.map(lambda x: x.replace('\n', '') if isinstance(x, str) else x)


# save the cleaned DataFrame to the original CSV file
df.to_csv(file_path, index=False)
# # print the cleaned DataFrame
# print(df.head())
import pandas as pd
import re

# Load the uploaded CSV
file_path = "#bitcoin_c.csv"
df = pd.read_csv(file_path)

# Remove all '@' symbols from all string entries
df = df.applymap(lambda x: x.replace('@', '') if isinstance(x, str) else x)

# Remove all '#' symbols from all string entries
df = df.applymap(lambda x: x.replace('#', '') if isinstance(x, str) else x)

# Remove all '...' symbols from all string entries
df = df.applymap(lambda x: x.replace('...', '') if isinstance(x, str) else x)

# convert all string entries to lowercase
df = df.applymap(lambda x: x.lower() if isinstance(x, str) else x)

# Remove all non-alphanumeric characters from all string entries
df = df.applymap(lambda x: re.sub(r'[^a-zA-Z0-9\s]', '', x) if isinstance(x, str) else x)

# Remove all leading and trailing whitespace from all string entries
df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

# Remove all empty strings from all string entries
df = df.applymap(lambda x: '' if isinstance(x, str) and x == '' else x)

# append each column to a new column
df['combined'] = df.apply(lambda x: ' '.join(x.dropna().astype(str)), axis=1)

# remove empty strings from the combined column
df['combined'] = df['combined'].replace('', pd.NA)
df = df.dropna(subset=['combined'])

# remove duplicates
df = df.drop_duplicates(subset=['combined'], keep='first')

# # remove all rows with empty strings
# df = df.dropna()


# save the cleaned DataFrame to the original CSV file
df.to_csv(file_path, index=False)
# print the cleaned DataFrame
print(df.head())
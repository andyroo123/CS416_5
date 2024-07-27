import pandas as pd
# Load the CSV file
df = pd.read_csv('data/country_temperature.csv')

# Filter the rows where the 'day' column is equal to 1
filtered_df = df.drop(columns=['State'])

# Save the filtered data to a new CSV file
filtered_df.to_csv('data/country_temperature.csv', index=False)

print("Filtered data saved to 'filtered_data.csv'")
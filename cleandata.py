import pandas as pd
# Load the CSV file
df = pd.read_csv('data/country_temperature.csv')

# Replace 'US' with 'United States' in the 'Country' column
df['Country'] = df['Country'].replace('Nepal', 'Nepal')

# Save the filtered data to a new CSV file
df.to_csv('data/country_temperature.csv', index=False)

print("Filtered data saved to 'filtered_data.csv'")
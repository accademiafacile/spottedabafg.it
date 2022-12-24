import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession
import pandas
import pyshorteners

def shorten_url(long_url):
  # Remove "https://www." from the start of the URL
  long_url = long_url.replace("https://www.", "", 1)
  
  # Shorten the URL using the TinyURL service
  s = pyshorteners.Shortener()
  short_url = s.tinyurl.short(long_url)
  return short_url

# Make an HTTP request to the website
session = HTMLSession()
page = session.get('https://www.abafg.it/category/avvisi/')

# Parse the HTML content
soup = BeautifulSoup(page.content, 'html.parser')

# Find all the news articles on the page
news = soup.select('h2.entry-title > a[href]')

# Create a DataFrame containing the title and URL of each news article
asDF = pandas.DataFrame([{
    'title': a.get_text().strip().lower(), 'link': a.get('href')
} for a in news])

# Update the DataFrame to include the shortened links
asDF['short_link'] = asDF['link'].apply(shorten_url)

# Read the template HTML file
with open('template.html', 'r') as f:
    template = f.read()

# Find the position of the second h1 element in the template
soup = BeautifulSoup(template, 'html.parser')
h1 = soup.find_all('h1')[1]

# Insert the news articles as links in an unordered list after the second h1 element
ul = '<ul>'
for index, row in asDF.iterrows():
    # Extract the title and shortened URL of the article
    title = row['title']
    short_link = row['short_link']
    
    # Create a list item with a link to the article
    li = f'<li><a href="{short_link}">{title}</a></li>'
    
    ul += li

ul += '</ul>'

# Replace the h1 element in the template with the unordered list
template = template.replace(str(h1), str(h1) + ul)

# Save the modified HTML page to a file
with open('../news.html', 'w') as f:
    f.write(template)

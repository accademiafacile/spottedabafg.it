import requests
from requests_html import HTMLSession
from bs4 import BeautifulSoup
import pandas as pd

# Make an HTTP request to the website
session = HTMLSession()
page = session.get('https://www.abafg.it/', headers={'Content-Type': 'text/html; charset=utf-8'})

# Parse the HTML content
page_content = page.content.decode('utf-8')
soup = BeautifulSoup(page_content, 'html.parser')

# Find all the news articles on the page
news = soup.select('h2.entry-title > a[href]')

# Create a DataFrame containing the title and URL of each news article
df = pd.DataFrame([{
    'title': a.get_text().strip().lower(), 'link': a.get('href')
} for a in news])

# Read the template HTML file
with open('template.html', 'r') as file:
  template = file.read()

# Parse the template HTML file
soup = BeautifulSoup(template, 'html.parser')

# Find the position of the second h1 element in the template
soup = BeautifulSoup(template, 'html.parser')
h1 = soup.find_all('h1')[1]

# Insert the news articles as links in an unordered list after the second h1 element
ul = '<ul>'
for index, row in df.iterrows():
    # Extract the title and shortened URL of the article
    title = row['title']
    url = row['link']

    # Create a list item with a link to the article
    li = f'<li><a href="{url}">{title}</a></li>'

    ul += li

ul += '</ul>'

# Replace the h1 element in the template with the unordered list
template = template.replace(str(h1), str(h1) + ul)

# Save the modified HTML page to a file
with open('../news.html', 'w') as f:
    f.write(template)

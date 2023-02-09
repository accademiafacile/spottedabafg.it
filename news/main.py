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

# Read the template.html file
with open('template.html', 'r') as file:
    html = file.read()

# Parse the HTML content
soup = BeautifulSoup(html, 'html.parser')

# Find the first div with a class of "button-list"
button_list = soup.select_one('div.news-list')

# Iterate through the rows in the DataFrame
for index, row in df.iterrows():
    # Create an a element with the link of the news article
    a = soup.new_tag('a', href=row['link'])
    # Create a div element with the title of the news article
    div = soup.new_tag('h4.btn-1')
    div.string = row['title']
    # Append the div element to the a element
    a.append(div)
    # Append the a element to the button_list element
    button_list.append(a)

# Save the modified HTML content to a new file
with open('../news.html', 'w') as file:
    file.write(str(soup))

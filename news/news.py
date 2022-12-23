import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession
import pandas
import pyshorteners

def shorten_url(long_url):
  s = pyshorteners.Shortener()
  short_url = s.tinyurl.short(long_url)
  return short_url

session = HTMLSession()
page = session.get('https://www.abafg.it/category/avvisi/')
soup = BeautifulSoup(page.content, 'html.parser')
news = soup.select('h2.entry-title > a[href]')

asDF = pandas.DataFrame([{
    'title': a.get_text().strip().lower(), 'link': a.get('href')
} for a in news])

# Update the DataFrame to include the shortened links
asDF['short_link'] = asDF['link'].apply(shorten_url)

# Save the updated DataFrame to a CSV file
asDF.to_csv('./titles.csv', index=False)
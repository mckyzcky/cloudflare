from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep, time
import json


def elem(browser, inp, k, c, m):
    try:
        if k != '':
            browser.find_element(By.XPATH, inp).send_keys(k)
        elif c:
            browser.find_element(By.XPATH, inp).click()
        elif m:
            return browser.find_elements(By.XPATH, inp)
        else:
            return browser.find_element(By.XPATH, inp)
    except Exception:
        return None


options = webdriver.ChromeOptions()
# options.add_argument('--headless=new')
options.add_argument('start-maximized')
browser = webdriver.Chrome(options=options)

link = 'https://tabs.ultimate-guitar.com/tab/'
links = [link + 'misc-soundtrack/jannat-zara-sa-chords-1160095', link + 'misc-soundtrack/woh-lamhe-kya-mujhe-pyaar-hai-chords-1997153',
         link + 'misc-soundtrack/yeh-jawaani-hai-deewani-ilahi-chords-1395536', link + 'a-r-rahman/roobaroo-chords-1112338']

start = time()
data = {}
for i in links:
    browser.get(i)
    sleep(2)
    data[i.split(link)[-1]] = elem(browser, '//pre', '', False, False).text

with open('tabData.json', 'w') as file:
    json.dump(data, file, indent=4)

print(time() - start)
browser.quit()

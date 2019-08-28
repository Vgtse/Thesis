import bs4
import pymysql
import re
import datetime
import difflib

from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

now = datetime.datetime.now()
date = now.strftime("%Y-%m")

my_url = "https://www.upatras.gr/el/calendar-node-field-date/month/"+"2019-04"
upatras = 'https://www.upatras.gr/el/'
uClient = uReq(my_url)
page_html = uClient.read()
uClient.close()
page_soup = soup(page_html,"html.parser")
events = page_soup.findAll("div" ,{"class":"views-row"})

connection = pymysql.connect(host="localhost",user="root",password="",db="studentapp")
my_cursor=connection.cursor()
my_cursor.execute("SET FOREIGN_KEY_CHECKS=0")
connection.commit()

for event in events:
        wantedTitle = event.find("div",{"class":"entry_title"})
        title = wantedTitle.h2.a.text
        #print(title)                             #event_title                 
       

        wantedURL = event.find("div",{"class":"node"})
        wantedURL = wantedURL["id"]
        URL = wantedURL.replace("-","/")
        FullURL = upatras+URL                                         
        #print(FullURL)                          #event_url
        
        code = re.sub("[^0-9]", "", URL)        #event_id
        #print(code)        
        my_cursor.execute('SELECT event_id FROM events WHERE (event_id=%s)', (code))
        entry = ""
        entry = my_cursor.fetchone()
        
                                
        if entry is None:
                
                uClient = uReq(FullURL)
                page_html = uClient.read()
                uClient.close()
                page_soup = soup(page_html,"html.parser")
                index = page_soup.find("div" ,{"class":"field-type-text-with-summary"})
                details = index.text
                #print(details)                         #event_details

                page_soup = soup(page_html,"html.parser")
                picture = page_soup.find("div",{"class":"content"})
                picture = picture.find("img")
                #print(picture)
                                


                page_soup = soup(page_html,"html.parser")
                start_date = page_soup.find("span" ,{"class":"date-display-single"})
                if(start_date!=None):
                    start_date = start_date.text[:18]
                    start_date = datetime.datetime.strptime(start_date,'%d/%m/%Y - %H:%M')
                    end_date = None
                    end_time = None
                    #print(start_date)
                    start_time = start_date.time()
                    start_date = start_date.date()
                    
                else:
                    start_date = page_soup.find("span" ,{"class":"date-display-start"})
                    start_date = start_date.text
                    start_date = datetime.datetime.strptime(start_date,'%d/%m/%Y - %H:%M')
                    end_date = page_soup.find("span" ,{"class":"date-display-end"})
                    end_date = end_date.text
                    end_date = datetime.datetime.strptime(end_date,'%d/%m/%Y - %H:%M')
                    start_time = start_date.time()
                    start_date = start_date.date()
                    end_time = end_date.time()
                    end_date = end_date.date()
                    #print(start_date)
                    #print("-")
                    #print(end_date)
                                                #event_time
                page_soup = soup(page_html,"html.parser")
                picture = page_soup.find("div",{"class":"entry_content content"})
                picture = picture.find("img")
                if picture is not None:
                        picture = picture["src"]
                        #print(picture)
                else:
                        picture = "https://citycampus.gr/wp-content/uploads/2018/04/-e1525032972222.jpg"  #image_path

                page_soup = soup(page_html,"html.parser")
                page = page_soup.find("div",{"class":"field-name-field-link"})
                if(page!=None):
                            link = page.a["href"]
                            #print(link)


                page_soup = soup(page_html,"html.parser")
                index = page_soup.find("div" ,{"class":"field-name-field-venue"})
                place = index.text
                if ',' in place:
                    building = place.split(",")[0]
                    building_location = place.split(",")[1]
                    building_location = building_location[1:]
                    #print(building)
                    #print("at")
                    #print(building_location)
                    #print("")
                else:
                    building = place
                    #print(building)
                    #print("")                   #event_place
                    building_location=None
                my_cursor.execute('SELECT building_id FROM `buildings` WHERE (building_name=%s)', (building))
                entry = ""
                entry = my_cursor.fetchone()
                if entry is not None:
                        building = entry[0]
                else:
                        my_cursor.execute('SELECT building_name FROM `buildings`')
                        entry = my_cursor.fetchall()
                        #print(entry)
                        for n in entry:
                                #print (n[0])
                                sequence = difflib.SequenceMatcher(isjunk=None,a=n[0],b=building)
                                difference = sequence.ratio()*100
                                difference = round(difference,1)
                                if(difference>70):
                                        building=n[0]
                        my_cursor.execute('SELECT building_id FROM `buildings` WHERE (building_name=%s)', (building))
                        entry = ""
                        entry = my_cursor.fetchone()
                if entry is not None:
                        building = entry[0]
                        my_cursor.execute("INSERT INTO `events` (`event_id`,`event_title`,`details`,`event_url`,`beginning_date`,`ending_date`,`beginning_time`,`ending_time`,`building_id`,`building_place`,`image_path`) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(code,title,details,link,start_date,end_date,start_time,end_time,building,building_location,picture))
                        connection.commit()
#my_cursor.execute('SELECT building_name FROM `building`')
#entry = my_cursor.fetchall()
#print(entry)
#for n in entry:
        #print (n[0])
my_cursor.execute("SET FOREIGN_KEY_CHECKS=1")
connection.commit()
      
        

           

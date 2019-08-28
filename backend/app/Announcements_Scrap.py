import bs4
import pymysql
import re
import datetime as dt  

from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup




my_url = 'https://www.upatras.gr/el/announces'
upatras = 'https://www.upatras.gr/el/'
uClient = uReq(my_url)
page_html = uClient.read()
uClient.close()
page_soup = soup(page_html,"html.parser")
announcements = page_soup.findAll("div" ,{"class":"views-row"})

connection = pymysql.connect(host="localhost",user="root",password="",db="studentapp")
my_cursor=connection.cursor()

my_cursor.execute("SET FOREIGN_KEY_CHECKS=0")
connection.commit()

tags = page_soup.find("div",{"class":"form-item control-group form-type-select form-item-field-category-tid"})
tags = tags.find("select",{"id":"edit-field-category-tid"})
tags = tags.findAll("option")
array = []
i=0
for tag in tags:
        tag = tag.text
        if tag[0]=="-":
                tag=tag[1:]
        array.append(tag)
        i=i+1
tags_name = array[1:]
length=len(tags_name)
tags_id = []
tag_target='announce'
for i in range(length):
        
        tags_id.append("anno_"+str(i+1))
        
        my_cursor.execute('SELECT tag_id FROM tags WHERE (tag_id=%s)', (tags_id[i]))
        entry = ""
        entry = my_cursor.fetchone()
        
        if entry is None:
            my_cursor.execute("INSERT INTO `tags` (`tag_id`,`tag_name`,`tag_target`)VALUES (%s,%s,%s)",(tags_id[i],tags_name[i],tag_target))
            connection.commit()
        
for announcement in announcements:

        
        wantedURL = announcement.find("div",{"class":"node"})
        wantedURL = wantedURL["id"]
        URL = wantedURL.replace("-","/")
        FullURL = upatras+URL                                         #announcement_url
        #print(FullURL)
        #print(URL)
        
        announcement_id = re.sub("[^0-9]", "", URL)
        announcement_id = "announce_" + announcement_id
        print(announcement_id)                                                    #announcement_id

        
        wantedTitle = announcement.find("div",{"class":"entry_title"})
        announcement_title = wantedTitle.h2.a.text
        #print(announcement_title)                                                 #announcement_title
       
        my_cursor.execute('SELECT announcement_id FROM announcements WHERE (announcement_id=%s)', (announcement_id ))
        entry = ""
        entry = my_cursor.fetchone()
        if entry is None:

                uClient = uReq(FullURL)
                page_html = uClient.read()
                uClient.close()
                page_soup = soup(page_html,"html.parser")
                index = page_soup.find("div" ,{"class":"field-item even"})
                announcement_details = index.text                                         #announcement_details
                if announcement_details is "":
                        index = page_soup.find("div" ,{"class":"field field-name-body field-type-text-with-summary field-label-hidden"})
                        announcement_details = index.text 


                index = page_soup.find("div" ,{"class":"field field-name-field-attachment field-type-file field-label-above"})
                announcement_files=None
                if index is not None:
                        index = index.find("div",{"class":"field-items"})
                        index = index.findAll("a")
                        announcement_files="";
                        for i in index:
                                if i==index[-1]:
                                        announcement_files=announcement_files + i["href"]
                                else:
                                        announcement_files=announcement_files+ i["href"]+","                           #announcement_files


                index = page_soup.find("div" ,{"class":"field field-name-field-category field-type-taxonomy-term-reference field-label-above"})
                if index is not None:
                        index = index.find("div",{"class":"field-items"})
                        announcement_tagid = index.div.a.text
                        my_cursor.execute('SELECT tag_id FROM `tags` WHERE (tag_name=%s)', (announcement_tagid))
                        entry = ""
                        entry = my_cursor.fetchone()
                        announcement_tagid = entry[0]
                        
                else:
                        announcement_tagid=""
                #print(announcement_tagid);                                                          #announcement_tagid
                #print("");

        

                index = page_soup.find("ul" ,{"class":"entry_meta clearfix"})
                calendar = index.li.text
                calendar = calendar.replace("-",",")
                calendar = calendar[5:]
                date_time_object = dt.datetime.strptime(calendar,'%d/%m/%Y , %H:%M')

                announcement_date = date_time_object.date()
                announcement_time = date_time_object.time()

                my_cursor.execute("INSERT INTO `announcements` (`announcement_id`,`announcement_title`,`details`,`announcement_time`,`announcement_date`,`announcement_files`,`tagid`) VALUES(%s,%s,%s,%s,%s,%s,%s)",(announcement_id,announcement_title,announcement_details,announcement_time,announcement_date,announcement_files,announcement_tagid))
                connection.commit()
        
        
       # print (date_time_object)                                                #announcement_date 
                


        


          
connection = pymysql.connect(host="localhost",user="root",password="",db="studentapp")

my_cursor=connection.cursor()





my_cursor.execute("SET FOREIGN_KEY_CHECKS=1")
connection.commit()

connection.close()

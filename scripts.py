#!/usr/bin/python3

# apt_scripts
# Version 1
#
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#									         											 #
# Created Kyle Parry - kparry@securonix.com                                              #
#																						 #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

import pandas as pd
import unicodedata
import json

# ============================= ARTICLES =============================
xlsx = pd.ExcelFile('APT_Articles.xlsx')

# Loops through Sheets and makes a df for each sheet
df = pd.ExcelFile('APT_Articles.xlsx')
names_list = df.sheet_names

articles_json = {}

for sheet in names_list :
    sheet_df = df.parse(sheet)
    a_list = []

    for i, row in sheet_df.iterrows():
        a_dict = {
            'ref': row['refs'],
            'link': row['refs-href'],
        }
        a_list.append(a_dict)
        
    articles_json[sheet] = a_list 

xlsx = pd.ExcelFile('APT_Software.xlsx')

# ============================= SOFTWARE =============================

# Loops through Sheets and makes a df for each sheet
df = pd.ExcelFile('APT_Software.xlsx')
names_list = df.sheet_names

software_json = {}

for sheet in names_list :
    sheet_df = df.parse(sheet)
    s_list = []

    for i, row in sheet_df.iterrows():
        clean = unicodedata.normalize("NFKD", row['Techniques'])
        
        refs = row['References'].split(']')
        refs.pop()
        
        r_list = []
        
        for j in refs:
            s_index = j.replace('[', '')
            index = int(s_index) - 1
            push = articles_json[sheet][index]
            r_list.append(push)
          
        s_dict = {
            'id': row['ID'],
            'name': row['Name'],
            'articles': r_list,
            'techniques': clean.split(','),
            '_props': { 'color': 'warning', 'align': 'middle', 'width': '40%' },
        }

        s_list.append(s_dict)
        
    software_json[sheet] = s_list

# ============================= Techniques Used =============================

xlsx = pd.ExcelFile('APT_Techniques_Used.xlsx')

# Loops through Sheets and makes a df for each sheet
df = pd.ExcelFile('APT_Techniques_Used.xlsx')
names_list = df.sheet_names

techniques_used_json = {}
techniques_articles_json = {}

for sheet in names_list :
    sheet_df = df.parse(sheet)
    t_list = []
    rt_list = []

    for i, row in sheet_df.iterrows():
        r_list = []
        
        if len(row['Use'].split('[')) >= 2:
            refs = unicodedata.normalize("NFKD", row['Use']).split('[')
            refs.pop(0)
            for j in refs:
                s_index = j.replace(']', '')
                index = int(s_index) - 1

            r_list.append({
                'tName': unicodedata.normalize("NFKD", row['Name']), 
                'index': index})
                
        t_dict = {
            'name': unicodedata.normalize("NFKD", row['Name']),
            'use': unicodedata.normalize("NFKD", row['Use']),
            'articles': r_list,
            '_props': { 'color': 'warning', 'align': 'middle', 'width': '40%' },
        }
    
        rt_dict = {
            'name': unicodedata.normalize("NFKD", row['Name']),
            'articles': r_list,
        }

        t_list.append(t_dict)
        rt_list.append(rt_dict)
        
    techniques_used_json[sheet] = t_list
    techniques_articles_json[sheet] = rt_list

# ============================= APT INFO =============================
    
xlsx = pd.ExcelFile('APT.xlsx')

# Loops through Sheets and makes a df for each sheet
df = pd.read_excel('APT.xlsx')

APT_json = {}

for i, row in df.iterrows():

    apt_dict = {
        'name': row['APT Name'],
        'id': row['APT ID'],
        'synopsis': unicodedata.normalize("NFKD", row['Synopsis']),
        'groups': row['Associated Groups'],
        'origin': row['APT Origin'],
        'noticed': row['First Noticed'],
        'targetSectors': row['Targeted Sectors'],
        'targetRegions': row['Targeted Regions'],
        'targetCountries': row['Targeted Countries'],
    }
    
    APT_json[row['APT Name']] = apt_dict

# ============================= MERGE FILES INTO ONE CSV =============================

# Write articles, software and techniques used JSON csvs
with open("articles_dump.json", "w") as write_file:
    json.dump(articles_json, write_file) # encode dict into JSON
print("Done writing JSON data into articles_dump.json file")
articles_df = pd.read_json('articles_dump.json', typ='series')
articles_df.to_csv('articles.csv')
print("Done writing articles.csv")

with open("software_dump.json", "w") as write_file:
    json.dump(software_json, write_file) # encode dict into JSON
print("Done writing JSON data into software_dump.json file")
software_df = pd.read_json('software_dump.json', typ='series')
software_df.to_csv('software.csv')
print("Done writing software.csv")

with open("techniques_used_dump.json", "w") as write_file:
    json.dump(techniques_used_json, write_file) # encode dict into JSON
print("Done writing JSON data into techniques_used_dump.json file")
techniques_used_df = pd.read_json('techniques_used_dump.json', typ='series')
techniques_used_df.to_csv('techniques_used.csv')
print("Done writing techniques_used.csv")

articles = pd.read_csv('articles.csv', names=['APT Name','articles'])
articles = articles.iloc[1: , :]

software = pd.read_csv('software.csv', names=['APT Name','software'])
software = software.iloc[1: , :]

techniquesUsed = pd.read_csv('techniques_used.csv', names=['APT Name','techniquesUsed'])
techniquesUsed = techniquesUsed.iloc[1: , :]

software_techniquesUsed=pd.merge(software, techniquesUsed, on='APT Name')
software_techniquesUsed_articles=pd.merge(software_techniquesUsed, articles, on='APT Name')

result=pd.merge(software_techniquesUsed_articles, df, on='APT Name')
result

# APT 29 to much data for csv cell so must be added to mongo manually

# result=result.drop(result.index[8]) # Removes APT 29

print(result['articles'].loc[result.index[8]])
print(result['software'].loc[result.index[8]])
print(result['techniquesUsed'].loc[result.index[8]])

result.to_csv('APTS_result.csv')
print("Done writing APTS_result.csv")
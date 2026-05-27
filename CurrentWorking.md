Currently there are total 4 steps in the process 

1. First we have to give the list of the companies in the ```scraper/src/scrapers/companyLocationScarper.js``` file from this website https://techbehemoths.com/companies/  then run the location scrapper via this command ```cd scraper``` ```npm run findlocations``` this will create a file ```scraper/src/scrapers/companies.js ``` in which there will be cordinates of the companies. 

2. Then we will run the modal.com function to get the companies career pages 
    - First activate the venv via ```cd scraper/modal.com``` & ```source .venv/Scripts/activate```
    - Then run ```python run_career_search.py``` for the career urls of the companies 
    - If any changes in the modal function then deploy with the  ```modal deploy agent.py```
    - This will create a file name ```scraper/src/scrapers/companiesCareerUrl.js``` with the career pages urls of the companies 
    - Then we copy manually the career pages urls from this file and paste them in the ```scraper/src/companies.js```

3. Then run the Job Scrapers via ```cd scraper``` ```npm run orchestrate``` this will start the scrapers taking the input from the ```scraper/src/companies.js``` file.

4. And finally start backend service and the frontend service 
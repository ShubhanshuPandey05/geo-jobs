Hey Currently there is no solid logic for the jobs deactivation or deletion, and also the scraped content from the web is very noisey so the parsing of those data creates the false job posts so i think to introduce the Ai model for filtering the jobs from the content but using it for every single scraped job is not ideal it will make the system slow and expensive so i have create a plan for this 

Plan:
I will run the scrapers once in a day in the morning to keep the jobs fresh and latest. the scrapper starts with the one company fetch all the platforms for that company - its career page, its ATS platform, Jobs listing platform and all which are available for that company collecting all the jobpost for that company and handeling them differently means if the jobs where scraped by any ATS platform like (Greenhouse, Lever, Ashby) then they doesn't need the Ai validations so skip them Add them direclty after the other jobs validates. then we will create a single request to the ollama qwen:7b model for the filteration of the job posts (#In the request to the model the jobs will be in the json only cause the html parsing dom extraction should done as it is now okay), this process includes 

1. Job status identification:
   - Identify job-related keywords that indicate active positions, such as "open", "new", "position available", etc.
   - Use regular expressions or natural language processing techniques to search for these keywords within each job listing.

2. Filtering out inactive jobs:
   - Calculate a freshness score for each job based on factors like posting date, time since last activity, etc.
   - Set a threshold for the freshness score to identify and filter out inactive jobs.

3. Reporting and visualization:
   - Present the filtered job data in a report or a list that is easy to read and analyze.
   - Use charts, graphs, or tables to visually represent the distribution of active and inactive jobs.


Then we get the Confidence scoring of noisy data for the companies jobs and then we will delete the all the jobs of that specific company from the database and insert this new fresh and clean jobs processed from Ai + scraped from Ats Platforms.


So create a flow that whenever i run these scrapers it process the companies sequentially and then deleting the old jobs and adding the new One 


I think hard deleting the old jobs directly will be not a good approch so we should store the new jobs in the some other tables then delete the old ones from the jobs table and then inserting the new one from the staging table to the jobs table Okay.
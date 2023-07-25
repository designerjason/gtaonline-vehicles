# gtaonline-vehicles
A simple, straightforward app that lists all available vehicles in GTA5. A work in progress...

# prerequisites to run locally
node js with node package manager

## Getting the Data
Script currently works by scraping data directly from rockstar games website. Vehicle collection is sourced specifically from online free mode.

In the node terminal run `npm run scrape`, this will create the latest vehicle database and images.
`npm run dev` to run the app in the browser locally

## TODO
- make the front end app look pretty, include all the data attributes for each vehicle
- implement sorting by top speed etc
- option to filter by selectable 'favourite' cars
- check against GTA build version somewhere (steam?) before doing scrape - save version in file for reference
- config file for settings
- possibly add static site generator for front end files for faster app loading

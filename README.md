# gtaonline-vehicles

[https://designerjason.github.io/gtaonline-vehicles/](https://designerjason.github.io/gtaonline-vehicles/)

A simple, straightforward app that lists all available vehicles in GTA5. A work in progress...

# prerequisites to run locally
node js with node package manager


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

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

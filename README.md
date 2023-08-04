# gtaonline-vehicles

[https://designerjason.github.io/gtaonline-vehicles/](https://designerjason.github.io/gtaonline-vehicles/)

A simple, straightforward app that lists all available vehicles in GTA5.

# prerequisites to run locally
node js with node package manager


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Getting the latest Data
The script currently works by scraping vehicle data directly from the rockstar games website. Vehicle collection is sourced specifically from online free mode.

In the node terminal run `npm run scrape`, this will create the latest vehicle database and images.
`npm run dev` to run the app in the browser locally

## TODO
- implement sorting by top speed etc
- option to filter by selectable 'favourite' cars
- check against GTA build version somewhere (steam?) before doing scrape - save version in file for reference
- config file for settings
- code tidy up
- move dialog to it's own component

import jsdom from "jsdom"
import fs from "fs"
import imageFetch from "./imageFetch.js"
const { JSDOM } = jsdom
const url = "https://socialclub.rockstargames.com/gtav/VehiclesAjax/"
const urlImg = "https://s.rsg.sc/sc/images/games/GTAV/vehicles/screens/mp/main/"
const categories = ["boats","commercial","compacts","coupes","cycles","emergency","helicopters","industrial","military","motorcycles","muscle","off-road", "open-wheel", "planes","sedans","service","sports", "sports-classics","super","suvs","utility","vans"]
const vehicleList = []
const promises = categories.map(item => JSDOM.fromURL(`${url}?slot=Freemode&category=${item}`));

Promise.all(promises)
    .then(jdoms => {
        // Handle the resulting JSDOM objects
        jdoms.forEach(dom => {
            const htmlPage = dom.window.document
            const scriptEl = htmlPage.querySelector('script').textContent
            const json = JSON.parse(scriptEl)
            const vehicleCollections = json.VehiclesJson.VehicleCollections
            const category = json.category
            const vehicles = Array.from(vehicleCollections).filter(item => item.Url === category)

            const newVehicles = {[category]: vehicles[0].Vehicles}
            vehicleList.push(newVehicles)
        })
    })
    .then(() => {
        fs.writeFile('public/data/vehicleDB.json', `${JSON.stringify(vehicleList)}`, err => {
            if(err) console.error(err)
        })

        let vehicleNames = []

        vehicleList.forEach(category => {
            Object.keys(category).forEach(key => category[key].map(item => {
                vehicleNames.push(item.Url)
            }))
        })

        fs.writeFile('vehicleNames.txt', vehicleNames.toString(), err => {
            if(err) console.error(err)
        })

        fs.readFile('vehicleNames.txt', 'utf8', (error, data) => {
            if (error) {
              console.error(error)
              return
            }
            vehicleNames = [...data]
        })

        imageFetch(vehicleNames, urlImg)
    })
    .catch(err => console.error(err))
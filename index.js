import jsdom from "jsdom"
import fs from "fs"
import imageFetch from "./imageFetch.js"
const { JSDOM } = jsdom
const url = "http://192.168.1.160/test/"
//const url = "https://socialclub.rockstargames.com/gtav/VehiclesAjax"
const categories = ["cycles", "boats"]
// const categories = ["Boats","Commercial","Compacts","Coupes","Cycles","Emergency","Helicopters","Industrial","Military","Motorcycles","Muscle","Off-Road","Open Wheel","Planes","Sedans","Service","Sports", "Sports Classics","Super","SUVs","Utility","Vans"]
const vehicleList = []
const promises = categories.map(item => JSDOM.fromURL(`${url}${item}.html`));

Promise.all(promises)
    .then(jdoms => {
        // Handle the resulting JSDOM objects
        jdoms.forEach(dom => {
            const document = dom.window.document
            const scriptEl = document.querySelector('script').textContent
            const json = JSON.parse(scriptEl)
            const vehicleCollections = json.VehiclesJson.VehicleCollections
            const category = json.category
            const vehicles = Array.from(vehicleCollections).filter(item => item.Url === category)

            const newVehicles = {[category]: vehicles[0].Vehicles}
            vehicleList.push(newVehicles)
        })
    })
    .then(() => {
        fs.writeFile('docs/vehicleDB.js', JSON.stringify(vehicleList), err => {
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

        imageFetch(['bmx', 'cruiser', 'test'], url)
        //imageFetch(vehicleNames, url)

    })
    .catch(err => console.error(err))
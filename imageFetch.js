import fs from "fs"

export default function imageFetch(vehicleArr, sourceUrl) {

  const downloadImage = async (vehicleName, sourceUrl) => {

    fetch(sourceUrl)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => {
      fs.writeFileSync(`./docs/images/${vehicleName}.png`, Buffer.from(arrayBuffer))
    })
    .then(() => console.log('\x1b[32m%s\x1b[0m', `***  [${vehicleName}] has been downloaded!  ***`))
    .catch(e => console.error(e))
  }

  vehicleArr.forEach(vehicle => {
    return downloadImage(vehicle, `${sourceUrl}images/${vehicle}.png`)
  })
}

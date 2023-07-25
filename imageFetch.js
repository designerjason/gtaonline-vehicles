import fs from "fs"
export default function imageFetch(vehicleArr, sourceUrl) {

  const downloadImage = async (vehicleName, sourceUrl) => {
    fetch(sourceUrl)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => {
      fs.writeFileSync(`./docs/images/${vehicleName}.jpg`, Buffer.from(arrayBuffer))
    })
    .then(() => console.log('\x1b[32m%s\x1b[0m', `***  [${vehicleName}] has been downloaded!  ***`))
    .catch(e => console.error(e))
  }

  // ok, do the downloading. timeout delay to mitigate issue with the download function within forEach
  vehicleArr.forEach((vehicle, index) => {
    setTimeout(() => downloadImage(vehicle, `${sourceUrl}/${vehicle}.jpg`), index * 500);
  });
}

import fs from "fs"

//for testing
const image = "bmx"

export default function imageFetch(imageArr, sourceUrl) {

  const downloadImage = (image, sourceUrl) => {
    // function to fetch single image from url
    // save the image to the docs/images
  }

  const downloadAllImages = () => {
    // function to iterate over imageArr
    // run downloadImage for each iteration
  }

  downloadImage(image, `${sourceUrl}images/${image}.png`)
}

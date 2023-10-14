import fs from "fs"

function setBuildVer() {
    return new Promise((resolve, reject) => {
        fetch('https://api.steamcmd.net/v1/info/271590')
        .then(response => response.json())
        .then(data => {
            const buildId = data.data['271590'].depots.branches.public.buildid
            const buildTimestamp = Date.now()
            const exportBuildJs = `export default { build: ${buildId}, timestamp: ${buildTimestamp} }`
            fs.writeFileSync(`./buildVer.txt`, buildId)
            fs.writeFileSync(`./public/data/buildVer.js`, exportBuildJs)
            resolve(buildId)
        })
        .catch(error => {
            reject(error)
        })
    })
}

function isLatestBuildVersion() {
    return new Promise((resolve, reject) => {
        fetch('https://api.steamcmd.net/v1/info/271590')
        .then(response => response.json())
        .then(data => {
            const latestBuildId = data.data['271590'].depots.branches.public.buildid
            const currentBuildId = fs.readFileSync('./buildVer.txt', 'utf8').toString()    
            resolve(latestBuildId === currentBuildId)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export { setBuildVer, isLatestBuildVersion }

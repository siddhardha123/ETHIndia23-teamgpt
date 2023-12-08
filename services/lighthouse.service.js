const lighthouse = require('@lighthouse-web3/sdk')
const lighthouseApiKey = process.env.LIGHTHOUSE_API_KEY || 3001;

const write = async (key, value) => {
    const data = { [key]: value };
    const jsonData = JSON.stringify(data);
    return lighthouse.uploadText(jsonData, lighthouseApiKey, name);
};

const read = async (key) => {
    const response = await lighthouse.getUploads(lighthouseApiKey)
    console.log(response)
}


module.exports = {
    read,
    write,
}

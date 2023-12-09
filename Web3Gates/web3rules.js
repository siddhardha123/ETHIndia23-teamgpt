const Moralis = require("moralis").default;
require('dotenv').config();

// Configuration
const config = {
  apiKey: process.env.WEB3SECRET,
  chain: "0x1",
  walletAddresses: [
    "0xE92d1A43df510F82C66382592a047d288f85226f",
    "0xEbC4ee59318B9fAfdA63F3F22B185375516Ffa75",
    // ...
  ],
  singleAddress: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
};

let lastApiCallTimestamp = 0;

// Throttle function to limit API calls
async function throttleApiCall() {
  const now = Date.now();
  const delay = 200; // milliseconds
  if (now - lastApiCallTimestamp < delay) {
    await new Promise(resolve => setTimeout(resolve, delay - (now - lastApiCallTimestamp)));
  }
  lastApiCallTimestamp = Date.now();
}

// Initialize Moralis
async function initializeMoralis() {
  try {
    await Moralis.start({ apiKey: config.apiKey });
  } catch (e) {
    console.error('Error initializing Moralis:', e);
  }
}

// Function to fetch wallet balances for up to 25 wallets
const getNativeBalances  = async(walletAdds,chain) => {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.balance.getNativeBalancesForAddresses({
      chain: chain,
      walletAddresses: walletAdds,
    });
    return response
  } catch (e) {
    console.error('Error fetching native balances:', e);
  }
}

// Function for ENS Lookup by wallet address
async function ensLookup() {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.resolve.resolveAddress({
      address: config.singleAddress,
    });
    console.log(response.raw);
  } catch (e) {
    console.error('Error in ENS Lookup:', e);
  }
}

// Function to get wallet stats
const getWalletStats = async (address,chain) => {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.wallets.getWalletStats({
      chain: chain,
      address: address,
    });
    return response
  } catch (e) {
    console.error('Error getting wallet stats:', e);
  }
}

// Function to get ERC20 token balance
const  getWalletTokenBalances = async (walletAddress) => {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: config.chain,
      address: walletAddress,
    });
    return response
  } catch (e) {
    console.error('Error getting wallet token balances:', e);
  }
}

// Main function to control the flow
const  main = async (walletAdds) => {
  await initializeMoralis();
 const walletBalance =  await getNativeBalances(walletAdds,0x13881);
 let walletStats = []
 for(const walletAddress in walletAdds){
   const walletStat = await  getWalletStats(walletAdds[walletAddress],0x13881)
   walletStats.push(walletStat)
 }

 return {walletBalance,walletStats}
  // await ensLookup();
  // await getWalletStats();
  // await getWalletTokenBalances();
}

// main().catch(console.error);
module.exports = {
    main,
}

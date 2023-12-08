import Moralis from 'moralis';
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
async function getNativeBalances() {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.balance.getNativeBalancesForAddresses({
      chain: config.chain,
      walletAddresses: config.walletAddresses,
    });
    console.log(response.raw);
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
async function getWalletStats() {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.wallets.getWalletStats({
      chain: config.chain,
      address: config.singleAddress,
    });
    console.log(response.raw);
  } catch (e) {
    console.error('Error getting wallet stats:', e);
  }
}

// Function to get ERC20 token balance
async function getWalletTokenBalances() {
  try {
    await throttleApiCall();
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: config.chain,
      address: config.singleAddress,
    });
    console.log(response.raw);
  } catch (e) {
    console.error('Error getting wallet token balances:', e);
  }
}

// Main function to control the flow
// Main function to control the flow based on user-defined rules
async function main(rules) {
  await initializeMoralis();

  // Check each rule and call the associated function if the rule is true
  if (rules.getNativeBalances) {
    await getNativeBalances();
  }
  if (rules.ensLookup) {
    await ensLookup();
  }
  if (rules.getWalletStats) {
    await getWalletStats();
  }
  if (rules.getWalletTokenBalances) {
    await getWalletTokenBalances();
  }
}

// rules object
const userRules = {
  getNativeBalances: true,
  ensLookup: false,
  getWalletStats: true,
  getWalletTokenBalances: false,
};

main(userRules).catch(console.error);

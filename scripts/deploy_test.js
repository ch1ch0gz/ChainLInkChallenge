/// This script checks whether the deployed contract actually works.

//Contract Deploy by me
const existingContractAddr = "0x29F63e24CE84FBC380E14cF0e29364DeeC3d3423";
//Chainlink price feed in goerli
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const addr = "0xA39434A63A52E749F02807ae27335515BA4b07F7"
//0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e

const ALCHEMY_ENDPOINT = process.env.GOERLI_URL;
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_ENDPOINT);

async function main() {

  const chainLinkFeed = await ethers.getContractAt("ChainLinkFeed", existingContractAddr);
  console.log(chainLinkFeed.address)
  const result = await chainLinkFeed.hasPricedIncreased();
  console.log(result);
  const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
  const result1 = await priceFeed.latestRoundData();
  console.log("Latest Round Data", result1);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

require("@nomicfoundation/hardhat-toolbox-viem");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    ethereum: {
      url: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: ["0xYOUR_PRIVATE_KEY"]
    }
  }
};


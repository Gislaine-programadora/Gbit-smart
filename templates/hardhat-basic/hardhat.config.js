import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.RPC_SEPOLIA,
      accounts: [process.env.PRIVATE_KEY].filter(Boolean)
    }
  }
};


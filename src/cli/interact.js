import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";
import loadContract from "../utils/loadContract.js";

export default async function interactCmd() {
  console.log("\n🔗 Interagindo com o contrato...\n");

  const provider = new ethers.JsonRpcProvider(process.env.RPC_LOCAL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contract = await loadContract(wallet);

  console.log("📌 Endereço do Contrato:", contract.target);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log("🏷  Nome:", name);
  console.log("🔠 Símbolo:", symbol);
  console.log("💰 Supply Total:", totalSupply.toString());
}


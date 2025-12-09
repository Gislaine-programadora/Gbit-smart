import { ethers } from "ethers";
import fs from "fs";

export async function getBalance(address) {
  try {
    if (!address) throw new Error("Endereço não informado");

    const deployed = JSON.parse(fs.readFileSync("smartlayer/deployed-address.json", "utf8"));
    const contractAddress = deployed.address;

    const abi = [
      "function balanceOf(address) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)"
    ];

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();

    const formatted = ethers.formatUnits(balance, decimals);

    console.log(`\n💰 Saldo de ${address}`);
    console.log(`👉 ${formatted} ${symbol}\n`);

  } catch (err) {
    console.error("\n❌ Erro ao consultar saldo");
    console.error(err.message);
  }
}

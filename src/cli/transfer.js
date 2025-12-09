// src/cli/transfer.js
import { ethers } from "ethers";
import fs from "fs";

export default async function transferCmd(to, amount) {
  try {
    if (!to) throw new Error("Endereço de destino não informado");
    if (!amount) throw new Error("Quantidade não informada");

    // carregar endereço do contrato
    const deployed = JSON.parse(fs.readFileSync("smartlayer/deployed-address.json", "utf8"));
    const contractAddress = deployed.address;

    // provider e signer localhost Hardhat
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner();

    // ABI mínima ERC20
    const abi = [
      "function transfer(address to, uint256 amount) returns (bool)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const decimals = await contract.decimals();
    const symbol = await contract.symbol();

    const value = ethers.parseUnits(amount.toString(), decimals);

    console.log(`\n🚀 Enviando ${amount} ${symbol} para ${to}...\n`);

    const tx = await contract.transfer(to, value);
    await tx.wait();

    console.log("✅ Transferência concluída!");
    console.log("🔗 Hash da TX:", tx.hash);

    return {
      success: true,
      to,
      amount,
      hash: tx.hash
    };

  } catch (err) {
    console.error("❌ Erro ao transferir tokens");
    console.error(err.message);
    return { success: false, error: err.message };
  }
}

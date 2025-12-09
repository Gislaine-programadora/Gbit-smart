import { ethers } from "ethers";

export default async function inspectContract(address) {
  console.log(`🔍 Inspecionando contrato: ${address}`);

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  const code = await provider.getCode(address);

  if (code === "0x") {
    console.log("❌ Nenhum contrato encontrado neste endereço.");
    return;
  }

  console.log("📦 Bytecode encontrado!");
  console.log("📡 Consultando informações...");

  const balance = await provider.getBalance(address);

  console.log(`
📊 Detalhes do Contrato
────────────────────────────
• Endereço: ${address}
• Saldo: ${ethers.formatEther(balance)} ETH
• Bytecode size: ${code.length} bytes
`);
}

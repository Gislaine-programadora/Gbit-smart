// src/cli/contract.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

// =============================
// LOCALIZAR ARTEFATOS
// =============================
function getArtifactsPath() {
  const projectRoot = process.cwd();
  const artifactsPath = path.join(projectRoot, "artifacts", "contracts");

  if (!fs.existsSync(artifactsPath)) {
    throw new Error(`❌ A pasta de artefatos não existe:\n${artifactsPath}\n\nExecute:\n\nnpx hardhat compile`);
  }
  return artifactsPath;
}

function findABI(contractName = "MyToken") {
  const artifactsPath = getArtifactsPath();

  const files = fs.readdirSync(artifactsPath);

  for (const folder of files) {
    const full = path.join(artifactsPath, folder);
    const abiFile = path.join(full, `${contractName}.json`);

    if (fs.existsSync(abiFile)) {
      return JSON.parse(fs.readFileSync(abiFile, "utf8"));
    }
  }

  throw new Error(`❌ ABI de ${contractName} não encontrada.`);
}

// =============================
// PROVIDER AUTOMÁTICO
// =============================
function getProvider() {
  const rpc =
    process.env.RPC_URL ||
    "https://rpc.sepolia.org"; // fallback automático

  return new ethers.JsonRpcProvider(rpc);
}

// =============================
// INFO DO CONTRATO
// =============================
export default async function contractInfo(address) {
  console.log("\n📘 Carregando artefatos...");

  const abiJson = findABI("MyToken");
  const provider = getProvider();

  console.log("📄 ABI localizado!");

  const contract = new ethers.Contract(address, abiJson.abi, provider);

  console.log("\n🔎 Informações do contrato:\n");
  console.log(`📌 Endereço: ${address}`);

  try {
    const name = await contract.name();
    console.log(`🏷️  Nome: ${name}`);
  } catch {}

  try {
    const symbol = await contract.symbol();
    console.log(`🔤 Símbolo: ${symbol}`);
  } catch {}

  try {
    const decimals = await contract.decimals();
    console.log(`🔢 Decimais: ${decimals}`);
  } catch {}

  try {
    const supply = await contract.totalSupply();
    console.log(`💰 Total Supply: ${supply.toString()}`);
  } catch {}

  try {
    const owner = await contract.owner();
    console.log(`👑 Proprietário: ${owner}`);
  } catch {}

  console.log("\n✨ Finalizado!\n");
}


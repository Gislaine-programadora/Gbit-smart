// src/cli/deploy-auto.js

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export default async function deployAuto(network) {
  console.log("\n🚀 Gbit Smart - Deploy Automático\n");

  try {
    if (!network) {
      console.log("❌ Rede não informada. Use:");
      console.log("   gbit deploy auto --network sepolia\n");
      return;
    }

    console.log(`🌐 Rede selecionada: ${network}`);

    const scriptPath = path.resolve("scripts/deploy.js");

    if (!fs.existsSync(scriptPath)) {
      console.log("❌ O script scripts/deploy.js não existe!");
      return;
    }

    console.log("📦 Executando Hardhat...");

    const output = execSync(
      `npx hardhat run scripts/deploy.js --network ${network}`,
      { encoding: "utf8" }
    );

    console.log(output);

    // 📌 Encontrar endereço automaticamente
    const match = output.match(/0x[a-fA-F0-9]{40}/);

    if (!match) {
      console.log("❌ Não foi possível capturar o endereço do deploy.");
      return;
    }

    const contractAddress = match[0];

    console.log(`\n✅ Endereço capturado: ${contractAddress}`);

    // 📁 salvar deploy
    const deployFolder = path.resolve("deployments");
    if (!fs.existsSync(deployFolder)) fs.mkdirSync(deployFolder);

    const filePath = path.join(deployFolder, `${network}.json`);

    fs.writeFileSync(
      filePath,
      JSON.stringify({ address: contractAddress, network }, null, 2)
    );

    console.log(`📁 Salvo em: deployments/${network}.json\n`);
    console.log("✨ Deploy automático concluído!\n");
  } catch (err) {
    console.log("❌ Erro no deploy automático!");
    console.log(err.message);
  }
}

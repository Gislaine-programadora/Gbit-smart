import fs from "fs";

export default async function verify() {
  console.log("🔍 Verificando contrato no Etherscan...");

  try {
    const deployed = JSON.parse(fs.readFileSync("./deploy.json", "utf8"));
    const address = deployed.address;

    await execa("npx", [
      "hardhat",
      "verify",
      "--network",
      "sepolia",
      address
    ], { stdio: "inherit" });

    console.log("✔ Contrato verificado com sucesso!");
  } catch (err) {
    console.error("❌ Erro na verificação:", err.message);
  }
}

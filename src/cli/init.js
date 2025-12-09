#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import ora from "ora";
import { fileURLToPath } from "url";

// reconstruir __dirname (ESM não tem por padrão)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.cyanBright("\n🚀 Gbit Smart - Iniciando módulo Web3\n"));

export default async function initCmd() {
  const { layer } = await inquirer.prompt([
    {
      type: "list",
      name: "layer",
      message: "Selecione o tipo de módulo:",
      choices: ["Token ERC20", "NFT ERC721", "DAO Governance"]
    }
  ]);

  const basePath = process.cwd();
  const configDir = path.join(basePath, "smartlayer");
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir);

  const spinner = ora("Criando estrutura SmartLayer...").start();

  setTimeout(() => {
    let configFile = "";
    if (layer === "Token ERC20") configFile = "token.json";
    if (layer === "NFT ERC721") configFile = "nft.json";
    if (layer === "DAO Governance") configFile = "dao.json";

    // Caminho REAL dos templates instalados no pacote global
    const templatesDir = path.join(__dirname, "..", "config", "templates");
    const srcPath = path.join(templatesDir, configFile);

    try {
      fs.copyFileSync(srcPath, path.join(configDir, configFile));
      spinner.succeed(chalk.greenBright(`✅ ${layer} criado com sucesso!`));
      console.log(chalk.yellow(`📂 Configuração salva em: ${configDir}/${configFile}\n`));
    } catch (err) {
      spinner.fail(
        chalk.redBright("❌ Não foi possível copiar o template. Verifique se existe a pasta config/templates no pacote.")
      );
      console.error(err);
    }
  }, 800);
}



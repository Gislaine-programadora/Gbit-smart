import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";
import { ensureDirSync, copyDirSync } from "../utils/fs-extra.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório raiz dos templates
const TEMPLATES_DIR = path.join(__dirname, "..", "..", "templates");

export default async function createProject() {
  console.log(chalk.cyan("\n🚀 Gbit Smart - Criar Novo Projeto Web3\n"));

  // ------------------ PERGUNTAS --------------------
  const answers = await inquirer.prompt([
    { name: "name", message: "Nome do projeto:", default: "mydapp" },
    { type: "confirm", name: "hardhat", message: "Incluir Hardhat?", default: true },
    { type: "confirm", name: "foundry", message: "Incluir Foundry?", default: false },
    { type: "confirm", name: "example", message: "Incluir scripts de exemplo (deploy, mint, balance)?", default: true }
  ]);

  // Caminho do projeto
  const projectDir = path.join(process.cwd(), answers.name);

  // Criar pastas principais
  ensureDirSync(projectDir);
  console.log(chalk.green(`📁 Criando estrutura em: ${projectDir}\n`));

  const baseFolders = ["contracts", "scripts", "smartlayer"];
  baseFolders.forEach(folder => ensureDirSync(path.join(projectDir, folder)));

  // ------------------ PACKAGE.JSON --------------------
  const packageJson = {
    name: answers.name,
    version: "1.0.0",
    type: "module",
    private: false,
    scripts: {
      dev: "node scripts/start.js",
      deploy: "node scripts/deploy.js"
    }
  };

  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // ------------------ HARDHAT TEMPLATE --------------------
  if (answers.hardhat) {
    console.log(chalk.blue("📦 Instalando Template Hardhat..."));

    const templatePath = path.join(TEMPLATES_DIR, "hardhat-basic");
    copyDirSync(templatePath, projectDir);

    console.log(chalk.yellow("⬇ Instalando Hardhat no projeto..."));

    try {
      await execa("npm", ["install", "--save-dev", "hardhat"], { cwd: projectDir });
    } catch (err) {
      console.log(chalk.red("❌ Erro instalando Hardhat:"));
      console.log(err);
    }
  }

  // ------------------ FOUNDRY TEMPLATE --------------------
  if (answers.foundry) {
    console.log(chalk.magenta("🔧 Adicionando Foundry Template..."));

    const templatePath = path.join(TEMPLATES_DIR, "foundry-basic");
    copyDirSync(templatePath, projectDir);

    console.log(chalk.magenta("✔ Foundry básico adicionado!"));
  }

  // ------------------ EXAMPLES --------------------
  if (answers.example) {
    const scriptsPath = path.join(TEMPLATES_DIR, "example-scripts");
    copyDirSync(scriptsPath, path.join(projectDir, "scripts"));

    console.log(chalk.green("📜 Scripts de exemplo adicionados!"));
  }

  // ------------------ FINAL --------------------
  console.log(chalk.cyan("\n✨ Projeto criado com sucesso!"));

  console.log(chalk.green(`\n📁 Caminho do projeto: ${projectDir}`));

  console.log(chalk.yellow("\n👉 Próximos passos:\n"));
  console.log(chalk.white(`cd ${answers.name}`));
  console.log(chalk.white("npm install"));
  if (answers.hardhat) console.log(chalk.white("npx hardhat compile"));
  console.log("\n");
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function mainMenu() {
  console.log("🟣 Gbit Smart CLI\n");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // pasta onde estão os comandos
  const commandsPath = path.join(__dirname);

  // listar arquivos da pasta CLI
  const files = fs.readdirSync(commandsPath);

  // filtrar arquivos .js, remover mainMenu.js
  const commands = files
    .filter(f => f.endsWith(".js") && f !== "mainMenu.js")
    .map(f => f.replace(".js", ""))
    .sort();

  console.log("📌 Comandos disponíveis:\n");

  commands.forEach(cmd => {
    console.log(`  gbit ${cmd}`);
  });

  console.log("\nUse 'gbit <comando>' para executar.");
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadContract(contractName) {
  try {
    const filePath = path.join(__dirname, "..", "artifacts", `${contractName}.json`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ Artifact não encontrado: ${filePath}`);
    }

    const file = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Erro ao carregar o contrato:", error.message);
    process.exit(1);
  }
}

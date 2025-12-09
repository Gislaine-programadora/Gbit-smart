#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isJsonFile(name) {
  return name.toLowerCase().endsWith('.json');
}

function tryParseJson(content, filePath) {
  try {
    return JSON.parse(content);
  } catch (err) {
    console.warn(chalk.yellow(`Aviso: não foi possível parsear JSON em ${filePath}`));
    return null;
  }
}

/**
 * Procura recursivamente por ficheiros .json a partir de 'dir' e aplica callback(filePath)
 */
function walkJsonFiles(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkJsonFiles(full, cb);
    } else if (stat.isFile() && isJsonFile(name)) {
      cb(full);
    }
  }
}

export default async function abiCmd() {
  console.log(chalk.cyanBright('\n🔎 Extraindo ABIs — procurando por artefactos...\n'));

  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, 'artifacts'),           // Hardhat
    path.join(cwd, 'artifacts', 'contracts'),
    path.join(cwd, 'out'),                 // Foundry (out)
    path.join(cwd, 'build'),               // alguns setups
    path.join(cwd, 'artifacts', 'build-info')
  ];

  const destDir = path.join(cwd, 'smartlayer', 'abi');
  ensureDir(destDir);

  let found = 0;

  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    walkJsonFiles(dir, (filePath) => {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = tryParseJson(raw, filePath);
      if (!parsed) return;

      // Hardhat artifact shape: { "abi": [...], "metadata": "...", ... }
      if (parsed.abi && Array.isArray(parsed.abi) && parsed.abi.length > 0) {
        const outName = path.basename(filePath);
        const destPath = path.join(destDir, outName);
        fs.writeFileSync(destPath, JSON.stringify(parsed.abi, null, 2));
        console.log(chalk.green(`ABI extraída: ${outName}`));
        found++;
        return;
      }

      // Foundry: sometimes files are simple with "abi" or contract output structure
      if (parsed.output && parsed.output.abi) {
        const outName = path.basename(filePath);
        const destPath = path.join(destDir, outName);
        fs.writeFileSync(destPath, JSON.stringify(parsed.output.abi, null, 2));
        console.log(chalk.green(`ABI extraída (foundry-style): ${outName}`));
        found++;
        return;
      }
    });
  }

  if (found === 0) {
    console.warn(chalk.yellow('Nenhuma ABI encontrada — certifique-se de que compilou o projeto antes (hardhat/forge).'));
  } else {
    console.log(chalk.cyanBright(`\n✅ Concluído — ${found} ABIs gravadas em: ${path.relative(cwd, destDir)}\n`));
  }
}


#!/usr/bin/env node
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import open from 'open';
import chalk from 'chalk';

function readDeployedAddress(cwd) {
  const jsonFile = path.join(cwd, 'smartlayer', 'deployed-address.json');
  if (fs.existsSync(jsonFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
      return data;
    } catch (err) {
      return null;
    }
  }

  const deploymentsDir = path.join(cwd, 'smartlayer', 'deployments');
  if (fs.existsSync(deploymentsDir)) {
    const files = fs.readdirSync(deploymentsDir).filter(f => f.endsWith('.txt') || f.endsWith('.address') || f.endsWith('.json'));
    if (files.length > 0) {
      const first = files[0];
      const content = fs.readFileSync(path.join(deploymentsDir, first), 'utf8').trim();
      // se for json com addr
      try {
        const parsed = JSON.parse(content);
        if (parsed.address) return { address: parsed.address, network: parsed.network || 'ethereum' };
      } catch {}
      return { address: content, network: 'ethereum' };
    }
  }
  return null;
}

function etherscanUrl(address, network) {
  // Normalizar nomes de rede para os subdomínios do Etherscan/Polygonscan
  const net = (network || 'ethereum').toLowerCase();
  if (net.includes('polygon')) {
    // polygonscan
    if (net.includes('mumbai')) return `https://mumbai.polygonscan.com/address/${address}`;
    return `https://polygonscan.com/address/${address}`;
  }

  // Ethereum family
  if (net.includes('sepolia')) return `https://sepolia.etherscan.io/address/${address}`;
  if (net.includes('goerli')) return `https://goerli.etherscan.io/address/${address}`;
  if (net.includes('main') || net.includes('ethereum')) return `https://etherscan.io/address/${address}`;

  // fallback to etherscan with network prefix if supported
  return `https://etherscan.io/address/${address}`;
}

export default async function explorerCmd() {
  console.log(chalk.cyanBright('\n🔗 Abrir contrato no Explorer\n'));

  const cwd = process.cwd();

  const answers = await inquirer.prompt([
    { name: 'address', message: 'Endereço do contrato (ou deixe vazio para usar o deployment salvo)', default: '' },
    { name: 'network', message: 'Rede (se conhecida, ajuda a escolher o explorer)', default: '' }
  ]);

  let address = answers.address && answers.address.trim();
  let network = answers.network && answers.network.trim();

  if (!address) {
    const deployed = readDeployedAddress(cwd);
    if (!deployed || !deployed.address) {
      console.log(chalk.redBright('Nenhum endereço de deployment encontrado. Faça o deploy primeiro ou informe o endereço manualmente.'));
      return;
    }
    address = deployed.address;
    network = network || deployed.network || 'ethereum';
  }

  if (!address || address.length < 10) {
    console.log(chalk.redBright('Endereço inválido.'));
    return;
  }

  const url = etherscanUrl(address, network);
  console.log(chalk.green(`Abrindo: ${url}\n`));
  await open(url);
}

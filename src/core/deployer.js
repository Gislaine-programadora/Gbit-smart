import { execa } from 'execa';
import path from 'path';
import fs from 'fs';

export async function deployWithHardhat(projectDir, scriptPath, network) {
  const cwd = projectDir;

  // Capturar a saída do script de deploy
  const { stdout } = await execa(
    'npx',
    ['hardhat', 'run', '--network', network, scriptPath],
    { cwd }
  );

  // Procurar o endereço do contrato (padrão Hardhat)
  const match = stdout.match(/Endereço do Contrato:\s*(0x[a-fA-F0-9]{40})/);

  if (!match) {
    console.log(stdout);
    throw new Error("❌ Não foi possível capturar o endereço do contrato no deploy.");
  }

  return { address: match[1], raw: stdout };
}

export async function deploy(projectDir, options = {}) {
  const hasHardhat = fs.existsSync(path.join(projectDir, 'hardhat.config.js'));
  const hasForge = fs.existsSync(path.join(projectDir, 'foundry.toml'));

  if (hasHardhat) {
    const script = path.join(projectDir, 'scripts', 'deploy.js');
    if (!fs.existsSync(script)) {
      throw new Error('Script de deploy não encontrado: scripts/deploy.js');
    }

    const result = await deployWithHardhat(
      projectDir,
      script,
      options.network || 'sepolia'
    );

    return {
      engine: 'hardhat',
      address: result.address,
      network: options.network || 'sepolia'
    };
  }

  if (hasForge) {
    throw new Error('Deploy com Foundry não automatizado neste CLI.');
  }

  throw new Error('Nenhum ambiente de deploy detectado.');
}

import { execa } from 'execa';
import path from 'path';
import fs from 'fs';


async function runHardhatCompile(projectDir) {
// assume package.json e hardhat.config.js exist
const cwd = projectDir;
await execa('npx', ['hardhat', 'compile'], { stdio: 'inherit', cwd });
}


async function runFoundryCompile(projectDir) {
// foundry uses `forge build`
const cwd = projectDir;
await execa('forge', ['build'], { stdio: 'inherit', cwd });
}


export async function compile(projectDir) {
// prefer hardhat if config exists, else foundry if foundry.toml exists
const hasHardhat = fs.existsSync(path.join(projectDir, 'hardhat.config.js'));
const hasForge = fs.existsSync(path.join(projectDir, 'foundry.toml'));


if (hasHardhat) {
await runHardhatCompile(projectDir);
return { engine: 'hardhat' };
}
if (hasForge) {
await runFoundryCompile(projectDir);
return { engine: 'foundry' };
}
// default: create a minimal hardhat setup then compile
throw new Error('Nenhum ambiente de compilação detectado. Crie um projecto com `gbit create project` primeiro.');
}
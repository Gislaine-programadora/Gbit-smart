#!/usr/bin/env node

import { Command } from "commander";
import initCmd from "../src/cli/init.js";
import createCmd from "../src/cli/create.js";
import generateCmd from "../src/cli/generate.js";
import compileCmd from "../src/cli/compile.js";
import deployCmd from "../src/cli/deploy.js";
import abiCmd from "../src/cli/abi.js";
import explorerCmd from "../src/cli/explorer.js";

const program = new Command();

program
  .name("gbit")
  .description("CLI oficial do Gbit Smart Framework")
  .version("1.0.0");

program
  .command("init")
  .description("Cria um módulo SmartLayer inicial")
  .action(() => initCmd());

program
  .command("create")
  .description("Cria toda a estrutura de um projeto Web3")
  .action(() => createCmd());

program
  .command("generate")
  .description("Gera contratos a partir do SmartLayer")
  .action(() => generateCmd());

program
  .command("compile")
  .description("Compila os contratos com Hardhat")
  .action(() => compileCmd());

program
  .command("deploy")
  .description("Faz deploy do contrato gerado")
  .action(() => deployCmd());

program
  .command("abi")
  .description("Extrai ABI dos artefatos compilados")
  .action(() => abiCmd());

program
  .command("explorer")
  .description("Abre o contrato no Etherscan")
  .action(() => explorerCmd());

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}



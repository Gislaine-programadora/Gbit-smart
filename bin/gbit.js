#!/usr/bin/env node

import { Command } from "commander";
import initCmd from "../src/cli/init.js";
import createCmd from "../src/cli/create.js";
import generateCmd from "../src/cli/generate.js";
import compileCmd from "../src/cli/compile.js";
import deployCmd from "../src/cli/deploy.js";
import abiCmd from "../src/cli/abi.js";
import explorerCmd from "../src/cli/explorer.js";
import { getBalance } from "../src/cli/balance.js";
import transferCmd from "../src/cli/transfer.js"; 
import mintCmd from "../src/cli/mint.js"; 
import verify from "../src/cli/verify.js";
import contractCmd from "../src/cli/contract.js";
import inspectCmd from "../src/cli/inspect.js";
import deployAutoCmd from "../src/cli/deploy-auto.js";
import interact from "../src/cli/interact.js";





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

  program
  .command("balance <address>")
  .description("Mostrar saldo GBIT de um endereço")
 .action((address) => getBalance(address));

 program
  .command("verify")
  .description("Faz verificação automática no Etherscan")
  .action(verify);

program
  .command("inspect <address>")
  .description("Inspeciona bytecode, ABI, storage e metadata do contrato")
  .action(async (address) => {
    await inspectCmd(address);
  });



program
  .command("contract <address>")
  .description("Exibe informações de um contrato")
  .action(contractCmd);

  program
  .command("deploy-auto")
  .description("Executa deploy automático — captura endereço e salva")
  .option("--network <network>", "Rede para deploy")
  .action((opts) => deployAutoCmd(opts.network));



program
  .command("transfer <to> <amount>")
  .description("Enviar tokens GBIT")
  .action(transferCmd);



 program
  .command("interact")
  .description("Interagir com o contrato GBIT")
  .action(async () => {
    const module = await import("../src/cli/interact.js");
    return module.default();
  });



program
  .command("mint <to> <amount>")
  .description("Mintar tokens GBIT para um endereço")
  .action(mintCmd);


program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

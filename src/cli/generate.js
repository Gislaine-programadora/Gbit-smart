import path from "path";
import fs from "fs";
import { ensureDirSync } from "../utils/fs-extra.js";

export default async function generate(kind = "token") {
  const cfgPath = path.join(process.cwd(), "smartlayer", `${kind}.json`);
  const cfgs = JSON.parse(fs.readFileSync(cfgPath, "utf8"));

  const name = cfgs.name || "GbitToken";

  ensureDirSync(path.join(process.cwd(), "contracts"));

  if (kind === "token") {
    const solidity = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ${name} is ERC20 {
  constructor(uint256 initialSupply) ERC20("${name}", "${cfgs.symbol || "GBT"}") {
    _mint(msg.sender, initialSupply * (10 ** uint256(${cfgs.decimals || 18})));
  }
}
`;

    fs.writeFileSync(
      path.join(process.cwd(), "contracts", `${name}.sol`),
      solidity
    );

    console.log(`Contrato ${name}.sol gerado em /contracts`);
  }
}

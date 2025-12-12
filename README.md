🌐 Gbit Smart — Framework Web3 Completo

<p align="center">
  <img src="https://github.com/user-attachments/assets/ecad5563-3d9e-4ba0-a2b9-688cdd53ac56" width="500" alt="GBIT SMART Banner">
</p>



<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.2-blue.svg" />
  <img src="https://img.shields.io/badge/status-stable-success.svg" />
  <img src="https://img.shields.io/badge/Web3-Ethereum-blueviolet.svg" />
  <img src="https://img.shields.io/badge/CLI-gbit--smart-lightgrey.svg" />
</p>


 <img width="200" height="200" alt="caixinha gbit-smart" src="https://github.com/user-attachments/assets/3439d293-4351-4be5-afc4-09097bd910ae" />


   ![version](https://img.shields.io/badge/version-1.0.2-blue.svg)




<p align="center">
  <img src="https://img.shields.io/badge/Blockchain-Ethereum-3C3C3D?logo=ethereum&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Web3-Enabled-18A497?logo=web3dotjs&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Solidity-^0.8.0-363636?logo=solidity&logoColor=white&style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gbit%20Wallet%20Extension-1.0.2-blueviolet?style=for-the-badge&logo=googlechrome&logoColor=white" />
</p>

<h1 align="center">🚀 Gbit Wallet Extension</h1>

<p align="center">
  Extensão Web para gerenciamento completo de tokens, carteiras digitais e integração com contratos inteligentes.
</p>




Framework modular para criação e gerenciamento de Tokens (ERC20), NFTs (ERC721) e DAOs — com integração total Web3, Hardhat, Ethers e SmartLayer.
Simples, rápido e poderoso para 
automação Web3.


<svg xmlns="http://www.w3.org/2000/svg" width="760" height="120" viewBox="0 0 760 120" role="img" aria-label="gbit-smart npm badge">
  <defs>
    <linearGradient id="g1" x1="0" x2="1">
      <stop offset="0" stop-color="#0f1724"/>
      <stop offset="1" stop-color="#0b1220"/>
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- fundo -->
  <rect rx="12" width="760" height="120" fill="url(#g1)" />

  <!-- bloco NPM -->
  <g transform="translate(16,14)">
    <rect width="112" height="92" rx="10" fill="#e44d26" />
    <text x="56" y="58" text-anchor="middle" font-family="Segoe UI, Roboto, Arial" font-weight="700" font-size="36" fill="white">npm</text>
  </g>

  <!-- texto do pacote -->
  <g transform="translate(140,30)" filter="url(#shadow)">
    <text x="0" y="28" font-family="Inter, Roboto, Arial" font-size="26" font-weight="700" fill="#E6F0FF">gbit-smart</text>
    <text x="0" y="60" font-family="Inter, Roboto, Arial" font-size="14" fill="#AFC7DF">Framework modular Web3 · CLI · Hardhat · SmartLayer</text>
  </g>

  <!-- caixa de comando -->
  <g transform="translate(520,28)">
    <rect x="0" y="0" width="220" height="64" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.04)"/>
    <text x="16" y="22" font-family="Courier New, Courier, monospace" font-size="14" fill="#CDE8FF">Instalar</text>
    <text x="16" y="46" font-family="Courier New, Courier, monospace" font-size="14" fill="#FFF">npm install -g gbit-smart</text>
  </g>
</svg>





🚀 Instalação

Instale globalmente:

npm install -g gbit-smart


Verifique se instalou corretamente:

gbit

Isso exibirá todos os comandos disponíveis.

🧭 Comandos Disponíveis

Depois de instalar, execute:

gbit create 


Ou veja ajuda detalhada:

gbit help

📌 Lista completa de comandos
Comando	Descrição
init	Cria um módulo SmartLayer inicial
create	Cria toda a estrutura de um novo projeto Web3 (Hardhat, templates, scripts)
generate	Gera contratos automaticamente a partir dos arquivos SmartLayer
compile	Compila contratos via Hardhat
deploy	Faz deploy do contrato gerado na blockchain
abi	Extrai a ABI dos artefatos compilados
explorer	Abre o contrato no Etherscan
help [command]	Mostra ajuda detalhada de qualquer comando
🏗️ Criando seu primeiro projeto Web3 com o Gbit Smart

Crie seu projeto completo com:

gbit create


O comando cria automaticamente:

✔️ Pastas
✔️ Estrutura Hardhat
✔️ Templates
✔️ Scripts de deploy
✔️ Suporte aos comandos do framework

⚙️ Inicializando o SmartLayer

Cada projeto possui um SmartLayer para gerar contratos automaticamente.

Inicie o SmartLayer:

gbit init


Selecione um dos módulos:

Token ERC20

NFT ERC721

DAO Governance

Ele criará automaticamente:

smartlayer/
 ├─ token.json
 ├─ nft.json
 └─ dao.json

🛠️ Gerar contratos Solidity

Após configurar o SmartLayer:

gbit generate


Ele cria automaticamente contratos personalizados na pasta:

contracts/

🔨 Compilar contratos com Hardhat
gbit compile

🚀 Fazer Deploy dos contratos
gbit deploy


O deploy salvará os endereços gerados.

📦 Extrair ABI
gbit abi


Gera arquivos .json prontos para front-end.

🔍 Abrir contrato no Etherscan
gbit explorer

📁 Estrutura típica do projeto criado
my-project/
 ├─ contracts/
 ├─ scripts/
 ├─ smartlayer/
 ├─ node_modules/
 ├─ hardhat.config.js
 ├─ package.json
 └─ README.md

📦 NPM

🔗 Pacote Oficial:
https://www.npmjs.com/package/gbit-smart

📄 Licença

Este projeto é licenciado sob MIT License.
Você pode usar comercialmente, modificar e redistribuir.

👩‍💻 Desenvolvido por Gislaine Developer

💜 Web3 Engineer • Blockchain • Smart Contracts • Full-Stack Dev

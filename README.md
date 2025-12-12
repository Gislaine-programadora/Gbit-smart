🌐 Gbit Smart — Framework Web3 Completo

<p align="center">
  <img src="https://svg-banners.vercel.app/api?type=glitch&text=GBIT%20SMART%20%7C%20WEB3%20FRAMEWORK&width=1200&height=250" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.2-blue.svg" />
  <img src="https://img.shields.io/badge/status-stable-success.svg" />
  <img src="https://img.shields.io/badge/Web3-Ethereum-blueviolet.svg" />
  <img src="https://img.shields.io/badge/CLI-gbit--smart-lightgrey.svg" />
</p>




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


<p align="center">
  <img src="https://svg-banners.vercel.app/api?type=origin&text=GBIT%20SMART&width=1000&height=250" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.2-blue.svg" />
  <img src="https://img.shields.io/badge/status-stable-success.svg" />
  <img src="https://img.shields.io/badge/Web3-Ethereum-blueviolet.svg" />
</p>


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
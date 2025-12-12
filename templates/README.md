# Projeto criado com Gbit Smart CLI

Este projeto contém:

✔ Hardhat  
✔ Scripts de deploy  
✔ Template ERC20  
✔ Ambiente para RPC / Private Key  
✔ Estrutura profissional para startups  

## Comandos

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat run scripts/mint.js --network sepolia ADDRESS 1000

# 🌐 Gbit Smart

> Framework modular para criação de Tokens, NFTs e DAOs — com integração direta Web3 e MetaMask (Ethereum Mainnet).

---

## 🚀 Instalação

```bash
# Instale as dependências localmente
npm install -g gbit-smart
gbit 

# Ou instale globalmente criar seu projeto `gbit`
gbit create
```

---

## 🧩 Uso

```bash
gbit init
```

Selecione entre:
- `Token ERC20`
- `NFT ERC721`
- `DAO Governance`

O CLI criará automaticamente uma pasta `smartlayer/` com o template JSON do SmartLayer selecionado.

---

## ⚙️ Exemplos de templates

- `smartlayer/token.json`
- `smartlayer/nft.json`
- `smartlayer/dao.json`

---

## ⚙️ Próximos passos (sugeridos)
- Gerar contratos Solidity a partir dos templates.
- Adicionar scripts de deploy (Hardhat / Foundry) e integração com Etherscan.
- Criar painel web para monitoramento de deploys e transações.

---

👩‍💻 Desenvolvido por Gislaine Developer
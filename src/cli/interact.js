import { loadContract } from "../utils/loadContract.js";
import { connect } from "../web3/connect.js";

console.log("🚀 Gbit Smart - Iniciando CLI");

const web3 = connect();

// Exemplo de uso
const contract = loadContract("CoinGbit");

console.log("Contrato carregado com sucesso!");
console.log(contract);

export default function interact() {
  console.log("🚀 Gbit Smart - CLI iniciado");

  // coloque aqui toda a lógica do CLI
}


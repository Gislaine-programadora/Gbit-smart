import Web3 from "web3";
import dotenv from "dotenv";

dotenv.config();

export function connect() {
  if (!process.env.RPC_URL) {
    console.error("❌ RPC_URL não encontrada no .env");
    process.exit(1);
  }

  return new Web3(process.env.RPC_URL);
}

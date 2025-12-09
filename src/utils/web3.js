import { ethers } from "ethers";

export async function connectWallet() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error("MetaMask não detectado!");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  console.log("🔗 Conectado:", await signer.getAddress());
  return signer;
}

export async function getNetwork(provider) {
  const network = await provider.getNetwork();
  console.log("🌍 Rede:", network.name);
  return network;
}

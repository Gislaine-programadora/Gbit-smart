export const networks = {
  localhost: {
    name: "localhost",
    rpc: "http://127.0.0.1:8545",
    chainId: 31337
  },
  sepolia: {
    name: "sepolia",
    rpc: process.env.SEPOLIA_RPC,
    chainId: 11155111
  }
};

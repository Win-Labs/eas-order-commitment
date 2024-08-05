import { http, createConfig, injected } from "@wagmi/core";
import { optimismSepolia, sepolia } from "viem/chains";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  connectors: [injected()],
});

export const hhContractAddress = "";
export const hhContractAbi = [];

export const contractAddress = "";
export const contractAbi = [];

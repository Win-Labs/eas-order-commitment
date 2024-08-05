import { http, createConfig, injected } from "@wagmi/core";
import { optimismSepolia } from "viem/chains";

export const config = createConfig({
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(),
  },
  connectors: [injected()],
});

export const hhContractAddress = "";
export const hhContractAbi = [];

export const contractAddress = "";
export const contractAbi = [];

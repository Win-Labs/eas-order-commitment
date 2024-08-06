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

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
export const schemaRegistryContractAddress =
  "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";

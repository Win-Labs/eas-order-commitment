import React, { useContext, useEffect, useState } from "react";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useClient,
  useConnectorClient,
} from "wagmi";
import { hhContractAbi, hhContractAddress } from "../config.js";
import classes from "./Test.module.css";
import { useWatchContractEvent } from "wagmi";
import { WagmiContext } from "wagmi";

import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import {
  clientToProvider,
  useEthersProvider,
} from "../hooks/clientToProvider.js";
import { clientToSigner } from "../hooks/connectorClientToSigner.js";

const Test = () => {
  const [output, setOutput] = useState("");
  const { address } = useAccount();
  const publicClient = useClient();
  const walletClient = useConnectorClient();
  console.log("this is the useClient()", publicClient);
  console.log("this is the useConnectorClient()", walletClient);

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  // Gets a default provider (in production use something else like infura/alchemy)
  const provider = useEthersProvider();

  console.log("this is the provider", provider);

  // Connects an ethers style provider/signingProvider to perform read/write functions.
  // MUST be a signer to do write operations!
  eas.connect(provider);

  const schemaRegistryContractAddress =
    "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

  console.log(schemaRegistry);
  schemaRegistry.connect(provider);

  const schemaUID =
    "0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a";

  useEffect(() => {
    const logSchemaRecord = async () => {
      console.log(schemaRegistry);
      const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

      console.log(schemaRecord);
    };

    logSchemaRecord();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        background: "lightblue",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <button className={classes.btn} onClick={connectWallet}>
          {address ? address : "Connect Wallet"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {output}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <button className={classes.btn} onClick={() => {}}>
          function0
        </button>
        <button className={classes.btn} onClick={() => {}}>
          function1
        </button>
        <button className={classes.btn} onClick={() => {}}>
          function2
        </button>
        <button className={classes.btn} onClick={() => {}}>
          function3
        </button>
      </div>
    </div>
  );
};

export default Test;

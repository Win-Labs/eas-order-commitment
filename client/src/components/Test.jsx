import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import classes from "./Test.module.css";

import { useGetSchemaRecord, useRegisterSchema } from "./useEASabstractions.js";

const Test = () => {
  const [output, setOutput] = useState("");
  const { address } = useAccount();

  const connectWallet = () => {
    console.log("called connectWallet");
    setOutput(`called connectWallet: ${address}`);
  };

  const schemaRecord = useGetSchemaRecord(
    "0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a"
  );
  useEffect(() => {
    console.log(schemaRecord);
  }, [schemaRecord]);

  const schema = "uint256 eventId, uint8 voteIndex";
  const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
  const revocable = true;

  const registerSchema = useRegisterSchema();

  useEffect(() => {
    const register = async () => {
      await registerSchema(schema, resolverAddress, revocable);
    };
    register();
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

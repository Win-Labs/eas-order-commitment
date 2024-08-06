import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  EASContractAddress,
  schemaRegistryContractAddress,
} from "../config.js";
import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { useEthersProvider } from "../hooks/clientToProvider.js";
import { useEthersSigner } from "../hooks/connectorClientToSigner.js";

export const useEAS = () => {
  const provider = useEthersProvider();
  const eas = new EAS(EASContractAddress);
  eas.connect(provider);

  return eas;
};

export const useSchemaRegistry = () => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

  schemaRegistry.connect(provider);
  schemaRegistry.connect(signer);

  return schemaRegistry;
};

export const useSchemaRecord = (schemaUID) => {
  const schemaRegistry = useSchemaRegistry();
  const [schemaRecord, setSchemaRecord] = useState(null);

  useEffect(() => {
    const fetchSchemaRecord = async () => {
      const record = await schemaRegistry.getSchema({ uid: schemaUID });
      setSchemaRecord(record);
    };

    fetchSchemaRecord();
  }, [schemaUID, schemaRegistry]);

  return schemaRecord;
};

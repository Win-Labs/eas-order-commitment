import { useEffect, useState, useMemo } from "react";
import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import {
  EASContractAddress,
  schemaRegistryContractAddress,
} from "../config.js";
import { useEthersProvider } from "../hooks/clientToProvider.js";
import { useEthersSigner } from "../hooks/connectorClientToSigner.js";

export const useEAS = () => {
  const provider = useEthersProvider();
  const eas = useMemo(() => {
    const easInstance = new EAS(EASContractAddress);
    easInstance.connect(provider);
    return easInstance;
  }, [provider]);

  return eas;
};

export const useGetSchemaRecord = (schemaUID) => {
  const schemaRegistryInstance = new SchemaRegistry(
    schemaRegistryContractAddress
  );
  const provider = useEthersProvider();

  schemaRegistryInstance.connect(provider);
  const [schemaRecord, setSchemaRecord] = useState(null);

  useEffect(() => {
    const fetchSchemaRecord = async () => {
      try {
        const record = await schemaRegistryInstance.getSchema({
          uid: schemaUID,
        });
        setSchemaRecord(record);
      } catch (error) {
        console.error("Error fetching schema record:", error);
      }
    };

    fetchSchemaRecord();
  }, [schemaUID]);

  return schemaRecord;
};

export const useRegisterSchema = () => {
  const schemaRegistryInstance = new SchemaRegistry(
    schemaRegistryContractAddress
  );
  const signer = useEthersSigner();

  schemaRegistryInstance.connect(signer);

  const registerSchema = async (schema, resolverAddress, revocable) => {
    try {
      const transaction = await schemaRegistryInstance.register({
        schema,
        resolverAddress,
        revocable,
      });

      return await transaction.wait();
    } catch (error) {
      console.error("Error registering schema:", error);
      throw error;
    }
  };

  return registerSchema;
};

import React, { createContext, useContext, useState } from "react";

import useData from "../hooks/useData";

export const CustomContext = createContext({
  data: [],
  handleData: () => {},
});

export const useCustom = () => useContext(CustomContext);
const defatultData = useData();

export const CustomProvider = ({ children }) => {
  const [data, setData] = useState(defatultData);

  const handleData = (handler) => {
    setData(handler);
  };

  return (
    <CustomContext.Provider value={{ data, handleData }}>
      {children}
    </CustomContext.Provider>
  );
};

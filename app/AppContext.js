// app/AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [listData, setListData] = useState([]);

  return (
    <AppContext.Provider value={{ listData, setListData }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

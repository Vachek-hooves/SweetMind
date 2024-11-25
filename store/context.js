import {useContext, createContext, useState, useEffect} from 'react';

export const CreateContext = createContext({});

export const AppContext = ({children}) => {
  const value = {};
  return <CreateContext.Provider value={value}></CreateContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext();
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext');
  }
  return context;
};

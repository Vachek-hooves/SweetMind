import {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {feeling} from '../data/feeling';
import {feelingsService} from './utils';

export const CreateContext = createContext({
  feelings: [],
  updateFeelings: () => {},
  isLoading: Boolean,
});

export const AppContext = ({children}) => {
  const [feelings, setFeelings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadFellings = async () => {
      try {
        const data = await feelingsService.initializeFeelings();
        setFeelings(data);
      } catch (error) {
        console.error('Error loading feelings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFellings();
  }, []);

  // Update feelings
  const updateFeelings = async newFeelings => {
    try {
      const updatedFeelings = await feelingsService.updateFeelings(newFeelings);
      if (updatedFeelings) {
        setFeelings(updatedFeelings);
      }
    } catch (error) {
      console.error('Error updating feelings:', error);
    }
  };

  

  const value = {
    feelings,
    updateFeelings,
    isLoading
  };

  return (
    <CreateContext.Provider value={value}>{children}</CreateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext');
  }
  return context;
};

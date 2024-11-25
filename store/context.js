import {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {feeling} from '../data/feeling';

export const CreateContext = createContext({});

export const AppContext = ({children}) => {
  const [feelings, setFeelings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize feelings data
  const initializeFeelings = async () => {
    try {
      // Check if feelings data exists in AsyncStorage
      const storedFeelings = await AsyncStorage.getItem('feelings');
      
      if (!storedFeelings) {
        // If no data exists, store the initial data from feeling.js
        await AsyncStorage.setItem('feelings', JSON.stringify(feeling));
        setFeelings(feeling);
      } else {
        // If data exists, load it
        setFeelings(JSON.parse(storedFeelings));
      }
    } catch (error) {
      console.error('Error initializing feelings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update feelings in AsyncStorage
  const updateFeelings = async (newFeelings) => {
    try {
      await AsyncStorage.setItem('feelings', JSON.stringify(newFeelings));
      setFeelings(newFeelings);
    } catch (error) {
      console.error('Error updating feelings:', error);
    }
  };

  // Initialize data when component mounts
  useEffect(() => {
    initializeFeelings();
  }, []);

  const value = {
    feelings,
    updateFeelings,
    isLoading
  };

  return <CreateContext.Provider value={value}>{children}</CreateContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext');
  }
  return context;
};

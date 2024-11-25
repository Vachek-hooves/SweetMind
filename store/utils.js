import AsyncStorage from '@react-native-async-storage/async-storage';
import {feeling as initialFeelings} from '../data/feeling';

const FEELINGS_STORAGE_KEY = 'feelings';

export const feelingsService = {
    // Get feelings from storage
    getStoredFeelings: async () => {
      try {
        const storedFeelings = await AsyncStorage.getItem(FEELINGS_STORAGE_KEY);
        return storedFeelings ? JSON.parse(storedFeelings) : null;
      } catch (error) {
        console.error('Error getting stored feelings:', error);
        return null;
      }
    },
  
     // Update feelings in storage and return the updated data
  updateFeelings: async (newFeelings) => {
    try {
      await AsyncStorage.setItem(FEELINGS_STORAGE_KEY, JSON.stringify(newFeelings));
      return newFeelings;
    } catch (error) {
      console.error('Error updating feelings:', error);
      return null;
    }
  },
  
    // Initialize feelings data
    initializeFeelings: async () => {
      try {
        // Check for existing data
        const storedFeelings = await feelingsService.getStoredFeelings();
        
        // If no stored data, use initial data
        if (!storedFeelings) {
            return await feelingsService.updateFeelings(initialFeelings);
          }
  
        // Return stored data
        return storedFeelings;
      } catch (error) {
        console.error('Error initializing feelings:', error);
        return initialFeelings; // Fallback to initial data
      }
    }
  };
import {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {feeling} from '../data/feeling';
import {feelingsService} from './utils';

export const CreateContext = createContext({
  feelings: [],
  favorites: [],
  updateFeelings: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isLoading: Boolean,
});

export const AppContext = ({children}) => {
  const [feelings, setFeelings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const [feelingsData, favoritesData] = await Promise.all([
          feelingsService.initializeFeelings(),
          AsyncStorage.getItem('favorites')
        ]);
        
        setFeelings(feelingsData);
        setFavorites(favoritesData ? JSON.parse(favoritesData) : []);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const addToFavorites = async (item) => {
    try {
      const newFavorite = {
        id: Date.now().toString(),
        type: item.type, // 'quote' or 'task'
        content: item.content,
        mood: item.mood,
        timestamp: new Date().toISOString(),
      };

      const updatedFavorites = [...favorites, newFavorite];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  };

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
    favorites,
    updateFeelings,
    addToFavorites,
    removeFromFavorites,
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

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  };
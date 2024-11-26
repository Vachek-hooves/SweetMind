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

export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
};

export const updateUserData = async (updates) => {
  try {
    const currentData = await getUserData();
    const updatedData = { ...currentData, ...updates };
    await saveUserData(updatedData);
    return updatedData;
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
};
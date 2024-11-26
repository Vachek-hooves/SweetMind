import React, { useState, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import ActionCard from '../../components/ui/ActionCard';
import SelectMoodBtn from '../../components/ui/SelectMoodBtn';
import CurrentDate from '../../utils/CurrentDate';
import UserCard from '../../components/UserData/UserCard';
import { dayliQuotes } from '../../data/dayliQuotes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moods = ['happy', 'calm', 'reflective'];

const TabMoodScreen = () => {
  const navigation = useNavigation();
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    loadDailyQuote();
  }, []);

  const loadDailyQuote = async () => {
    try {
      const storedQuote = await AsyncStorage.getItem('dailyQuote');
      const storedDate = await AsyncStorage.getItem('dailyQuoteDate');
      const today = new Date().toDateString();

      if (storedQuote && storedDate === today) {
        setDailyQuote(JSON.parse(storedQuote));
      } else {
        // Get new random quote
        const randomIndex = Math.floor(Math.random() * dayliQuotes.length);
        const newQuote = dayliQuotes[randomIndex];
        
        // Save new quote and date
        await AsyncStorage.setItem('dailyQuote', JSON.stringify(newQuote));
        await AsyncStorage.setItem('dailyQuoteDate', today);
        
        setDailyQuote(newQuote);
      }
    } catch (error) {
      console.error('Error loading daily quote:', error);
      // Fallback to first quote if there's an error
      setDailyQuote(dayliQuotes[0]);
    }
  };

  const handleMoodSelect = mood => {
    navigation.navigate('StackFeelingMoodScreen', {mood});
  };

  const getNextQuote = () => {
    // This function won't change the quote until next day
    // You can show a message to user that quote changes daily
  };

  return (
    <MainTabLayout>
      <CustomLinearGradient>
        <View style={styles.container}>
          <UserCard />

          <ActionCard
            title="Daily Quote"
            content={dailyQuote?.quote || 'Loading...'}
            mainButtonText="New quote"
            onMainButtonPress={getNextQuote}
          />

          <View style={styles.moodSection}>
            <Text style={styles.moodTitle}>
              How are you{'\n'} feeling today?
            </Text>
            {moods.map(mood => (
              <SelectMoodBtn
                key={mood}
                mood={mood}
                onPress={handleMoodSelect}
              />
            ))}
          </View>

          <CurrentDate />
        </View>
        <View style={{height: 110}} />
      </CustomLinearGradient>
    </MainTabLayout>
  );
};

export default TabMoodScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  age: {
    fontSize: 14,
    color: '#fff',
  },

  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 22,
    borderColor: '#FF1FA5',
  },
  moodSection: {
    marginBottom: 30,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

import {dayliQuotes} from '../../data/dayliQuotes';
import {useState, useEffect} from 'react';
import ActionCard from './ActionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DayliQuote = () => {
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

  return (
    <ActionCard
      title="Daily Quote"
      content={dailyQuote?.quote || 'Loading...'}
      hiddenMainButton={true}
      
    />
  );
};

export default DayliQuote;


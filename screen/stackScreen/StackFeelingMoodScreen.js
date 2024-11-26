import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../store/context';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import MainStackLayout from '../../components/Layout/MainStackLayout';
import ActionCard from '../../components/ui/ActionCard';
import {getMoodEmoji} from '../../data/moodEmodji';
import ReturnIcon from '../../components/iconsComponent/ReturnIcon';
import CurrentDate from '../../utils/CurrentDate';

const StackFeelingMoodScreen = ({route}) => {
  const {mood} = route.params;
  const {feelings} = useAppContext();
  const [currentMood, setCurrentMood] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // Find the selected mood data
    const moodData = feelings.find(item => item.mood === mood);
    if (moodData) {
      setCurrentMood(moodData);
      // Get random task from the mood's tasks array
      const randomTask =
        moodData.tasks[Math.floor(Math.random() * moodData.tasks.length)];
      setCurrentTask(randomTask);
    }
  }, [mood, feelings]);

  const getNewQuote = () => {
    if (currentMood) {
      const randomTask =
        currentMood.tasks[Math.floor(Math.random() * currentMood.tasks.length)];
      setCurrentTask(randomTask);
    }
  };

  if (!currentMood || !currentTask) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MainStackLayout>
      <CustomLinearGradient>
        <View style={styles.container}>
          {/* Mood Header */}
          <View style={styles.headerSection}>
            <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
            <Text style={styles.moodTitle}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
            </Text>
            <Text style={styles.description}>{currentMood.description}</Text>
          </View>

          {/* Quote Card */}
          <ActionCard
            title="Happy Quote"
            content={currentTask.quote}
            mainButtonText="New quote"
            onMainButtonPress={getNewQuote}
            isTaskCard={false}
            mood={mood}
          />

          {/* Task Card */}
          <ActionCard
            title="Your task today:"
            content={currentTask.task}
            mainButtonText="Start task"
            onMainButtonPress={() => {}}
            isTaskCard={true}
            mood={mood}
          />

          {/* Date Display */}
          <CurrentDate />
        </View>
        <ReturnIcon />
        {/* <View style={{height: 110}} /> */}
      </CustomLinearGradient>
    </MainStackLayout>
  );
};

export default StackFeelingMoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  moodEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
});

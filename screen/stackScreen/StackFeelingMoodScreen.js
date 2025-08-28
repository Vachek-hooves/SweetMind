import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../store/context';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import MainStackLayout from '../../components/Layout/MainStackLayout';
import ActionCard from '../../components/ui/ActionCard';
import {getMoodEmoji} from '../../data/moodEmodji';
import ReturnIcon from '../../components/iconsComponent/ReturnIcon';
import CurrentDate from '../../utils/CurrentDate';
import {colors} from '../../theme/colors';

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
      <MainStackLayout>
        <CustomLinearGradient>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </CustomLinearGradient>
      </MainStackLayout>
    );
  }

  return (
    <MainStackLayout>
      <CustomLinearGradient>
        <View style={styles.container}>
          {/* Mood Header */}
          <View style={styles.headerSection}>
            <View style={styles.emojiContainer}>
              <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
            </View>
            <Text style={styles.moodTitle}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
            </Text>
            <Text style={styles.description}>{currentMood.description}</Text>
          </View>

          {/* Quote Card */}
          <ActionCard
            title="Daily Quote"
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: '600',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent.pureWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.accent.deepFlow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  moodEmoji: {
    fontSize: 40,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  dateText: {
    color: colors.text.primary,
    fontSize: 16,
  },
});

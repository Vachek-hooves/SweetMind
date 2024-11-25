import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../store/context';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import MainStackLayout from '../../components/Layout/MainStackLayout';

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

  const getMoodEmoji = moodType => {
    switch (moodType) {
      case 'happy':
        return '😊';
      case 'calm':
        return '😌';
      case 'reflective':
        return '🤔';
      default:
        return '😊';
    }
  };

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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Happy Quote</Text>
            <Text style={styles.quoteText}>{currentTask.quote}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.mainButton} onPress={getNewQuote}>
                <Text style={styles.mainButtonText}>New quote</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔄</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>👍</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Task Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your task today:</Text>
            <Text style={styles.taskText}>{currentTask.task}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Start task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔄</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>👍</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Display */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>12.03.2024</Text>
          </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: '#FF68A8',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#FF68A8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
  },
  iconText: {
    fontSize: 18,
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

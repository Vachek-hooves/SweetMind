import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAppContext} from '../../store/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTimer, formatTime} from './actionCardComponents/Timer';
import ActionButton from './actionCardComponents/ActionButton';
import FavoriteButton from './actionCardComponents/FavoriteButton';

const ActionCard = ({
  title,
  content,
  mainButtonText,
  onMainButtonPress,
  isTaskCard,
  mood,
}) => {
  const {addToFavorites, favorites} = useAppContext();
  const [taskTimer, setTaskTimer] = useState({
    isActive: false,
    timeLeft: 600,
    taskContent: null, // Store the task content when timer starts
  });
  const [isFavorite, setIsFavorite] = useState(false);

  useTimer(taskTimer, setTaskTimer);

  useEffect(() => {
    const isAlreadyFavorite = favorites.some(
      fav =>
        fav.content === content && fav.type === (isTaskCard ? 'task' : 'quote'),
    );
    setIsFavorite(isAlreadyFavorite);
  }, [favorites, content, isTaskCard]);

  useEffect(() => {
    const isAlreadyFavorite = favorites.some(
      fav =>
        fav.content === content && fav.type === (isTaskCard ? 'task' : 'quote'),
    );
    setIsFavorite(isAlreadyFavorite);
  }, [favorites, content, isTaskCard]);

  const handleMainButtonPress = () => {
    if (isTaskCard) {
      if (taskTimer.isActive && taskTimer.taskContent !== content) {
        Alert.alert(
          'Task in Progress',
          'Please finish the current task first!',
        );
        return;
      }

      if (!taskTimer.isActive) {
        setTaskTimer({
          isActive: true,
          timeLeft: 600,
          taskContent: content,
        });
      } else {
        setTaskTimer({
          isActive: false,
          timeLeft: 600,
          taskContent: null,
        });
      }
    } else {
      onMainButtonPress();
    }
  };

  const handleFavoritePress = async () => {
    if (!isFavorite) {
      const item = {
        type: isTaskCard ? 'task' : 'quote',
        content,
        mood,
      };
      const success = await addToFavorites(item);
      if (success) {
        setIsFavorite(true);
      }
    }
  };

  const getButtonText = () => {
    if (!isTaskCard) return mainButtonText;
    if (taskTimer.isActive && taskTimer.taskContent === content) {
      return formatTime(taskTimer.timeLeft);
    }
    if (taskTimer.isActive && taskTimer.taskContent !== content) {
      return 'Task in progress';
    }
    return mainButtonText;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
      <View style={styles.actionButtons}>
        <ActionButton
          text={getButtonText()}
          onPress={handleMainButtonPress}
          disabled={
            isTaskCard &&
            taskTimer.isActive &&
            taskTimer.taskContent !== content
          }
          isCountdown={taskTimer.isActive && taskTimer.taskContent === content}
        />
        <FavoriteButton isFavorite={isFavorite} onPress={handleFavoritePress} />
      </View>
    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 22,
    color: '#FF1FA5',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#FF1FA5',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#FF1FA5',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 42,
    justifyContent: 'center',
    minWidth: 100,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    width: 140,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 22,
    borderColor: '#FF1FA5',
  },
  iconButtonActive: {
    backgroundColor: '#FF1FA5',
    borderColor: '#FF1FA5',
  },
  countdownButton: {
    backgroundColor: '#4CAF50', // Green for active countdown
  },
  completedButton: {
    backgroundColor: '#FF1FA5', // Return to original color when completed
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

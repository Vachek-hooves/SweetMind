import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ActionCard = ({title, content, mainButtonText, onMainButtonPress, isTaskCard}) => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    let timer;
    if (isCountingDown && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCountingDown(false);
      setTimeLeft(600); // Reset timer
    }

    return () => clearInterval(timer);
  }, [isCountingDown, timeLeft]);

  const handleMainButtonPress = () => {
    if (isTaskCard) {
      if (isCountingDown) {
        // Stop countdown and reset
        setIsCountingDown(false);
        setTimeLeft(600);
      } else {
        // Start countdown
        setIsCountingDown(true);
      }
    } else {
      onMainButtonPress();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getButtonText = () => {
    if (!isTaskCard) return mainButtonText;
    if (isCountingDown) return formatTime(timeLeft);
    return mainButtonText;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[
            styles.mainButton,
            isCountingDown && styles.countdownButton,
            timeLeft === 0 && styles.completedButton // Optional: different style when completed
          ]} 
          onPress={handleMainButtonPress}
        >
          <Text style={styles.mainButtonText}>{getButtonText()}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="smile-o" size={24} color="#FF1FA5" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="thumbs-up" size={24} color="#FF1FA5" />
        </TouchableOpacity>
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
    width:140
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 22,
    borderColor: '#FF1FA5',
  },
  countdownButton: {
    backgroundColor: '#4CAF50', // Green for active countdown
  },
  completedButton: {
    backgroundColor: '#FF1FA5', // Return to original color when completed
  },
});

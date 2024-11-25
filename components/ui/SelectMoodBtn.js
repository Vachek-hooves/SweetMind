import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectMoodBtn = ({mood, onPress, icon}) => {
  const getMoodEmoji = moodType => {
    switch (moodType) {
      case 'happy':
        return '�';
      case 'calm':
        return '😌';
      case 'reflective':
        return '🤔';
      default:
        return '😊';
    }
  };

  return (
    <TouchableOpacity style={styles.moodButton} onPress={() => onPress(mood)}>
      <Text style={styles.moodText}>
        {getMoodEmoji(mood)} {mood.charAt(0).toUpperCase() + mood.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectMoodBtn;

const styles = StyleSheet.create({
  moodButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  moodText: {
    fontSize: 22,
    color: '#FF1FA5',
    fontWeight: '800',
  },
});

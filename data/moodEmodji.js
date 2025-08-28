import {StyleSheet, Image} from 'react-native';
export const getMoodEmoji = (mood) => {
  switch (mood.toLowerCase()) {
    case 'happy':
      return '😊';
    case 'calm':
      return '🧘';
    case 'reflective':
      return '🤔';
    default:
      return '😊';
  }
};

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
  },
});



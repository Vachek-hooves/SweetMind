import {StyleSheet, Image} from 'react-native';
export const getBtnEmodji = moodType => {
  switch (moodType) {
    case 'happy':
      return (
        <Image
          source={require('../assets/image/icon/happyIcon.png')}
          style={styles.icon}
        />
      );
    case 'calm':
      return (
        <Image
          source={require('../assets/image/icon/calmIcon.png')}
          style={styles.icon}
        />
      );
    case 'reflective':
      return (
        <Image
          source={require('../assets/image/icon/reflectionIcon.png')}
          style={styles.icon}
        />
      );
    default:
      return (
        <Image
          source={require('../assets/image/icon/happyIcon.png')}
          style={styles.icon}
        />
      );
  }
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

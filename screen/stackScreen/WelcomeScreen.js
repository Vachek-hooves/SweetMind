import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  return (
    <LinearGradient
      colors={[
        // 'transparent',
        'rgba(255, 104, 168, 0.2)',
        'rgba(255, 104, 168, 0.7)',
        'rgba(255, 104, 168, 0.9)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        // '#FF68A8',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.1, 0.2, 0.3, 0.5, 0.5, 0.7, 1]}
      style={styles.linearGradient}>
      <LottieView
        source={require('../../assets/animations/moodAnimation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,

    justifyContent: 'flex-end',
  },

  lottie: {
    bottom: '-10%',
    width: '100%',
    height: 400,
  },
});

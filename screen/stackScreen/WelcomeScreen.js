import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({navigation}) => {
  const titleAnim = useRef(new Animated.Value(-200)).current;
  const subtitleAnim = useRef(new Animated.Value(-200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Title animation
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 150,  // Final position from top
        duration: 2500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      // Subtitle animation starts after title
      Animated.timing(subtitleAnim, {
        toValue: 220,  // Final position from top
        duration: 2500,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ]).start();

    // Fade in animation for both texts
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={[
        'rgba(255, 104, 168, 0.5)',
        'rgba(255, 104, 168, 0.7)',
        'rgba(255, 104, 168, 0.9)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.1, 0.2, 0.3, 0.5, 0.5, 0.7, 1]}
      style={styles.linearGradient}>
      
      <View style={styles.textContainer}>
        <Animated.Text 
          style={[
            styles.title,
            {
              transform: [{translateY: titleAnim}],
              opacity: opacityAnim,
            }
          ]}>
          Sweet Mind
        </Animated.Text>

        <Animated.Text 
          style={[
            styles.subtitle,
            {
              transform: [{translateY: subtitleAnim}],
              opacity: opacityAnim,
            }
          ]}>
          Welcome to Sweet Mind, your daily companion for positivity and mindfulness.
        </Animated.Text>
      </View>

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
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  lottie: {
    bottom: '-10%',
    width: '100%',
    height: 400,
  },
});

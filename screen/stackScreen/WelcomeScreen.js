import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({navigation}) => {
  const titleAnim = useRef(new Animated.Value(-300)).current;
  const subtitleAnim = useRef(new Animated.Value(-300)).current;
  const buttonAnim = useRef(new Animated.Value(-300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Title animation
      Animated.timing(titleAnim, {
        toValue: 50,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      // Subtitle animation
      Animated.timing(subtitleAnim, {
        toValue: 80,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      // Button animation
      Animated.timing(buttonAnim, {
        toValue: 110,
        duration: 1500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();

    // Fade in animations
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Button fade in with delay
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(buttonOpacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    navigation.replace('TabNavigator');
  };

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
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{height: 440}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [{translateY: titleAnim}],
                opacity: opacityAnim,
              },
            ]}>
            Your Sweet Mind
          </Animated.Text>

          <Animated.Text
            style={[
              styles.subtitle,
              {
                transform: [{translateY: subtitleAnim}],
                opacity: opacityAnim,
              },
            ]}>
            Welcome to Your Sweet Mind, your daily companion for positivity and
            mindfulness.
          </Animated.Text>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [{translateY: buttonAnim}],
                opacity: buttonOpacityAnim,
              },
            ]}>
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </Animated.View>
         
        </View>
      </ScrollView>

      <View style={{ right:-50}}>
        <LottieView
          source={require('../../assets/animations/moodAnimation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  lottie: {
    bottom: '-10%',
    width: '100%',
    height: 300,

  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FF1FA5',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

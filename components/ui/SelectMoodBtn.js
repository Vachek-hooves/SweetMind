import {StyleSheet, Text, TouchableOpacity, View,Animated} from 'react-native';
import {useRef, useEffect} from 'react';
import {getBtnEmodji} from '../../data/btnEmodji';


const SelectMoodBtn = ({mood, onPress}) => {
    const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
  
      floatingAnimation.start();
  
      // Cleanup animation on component unmount
      return () => floatingAnimation.stop();
  }, []);

  const yOffset = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0,-10],
  });


  return (
    <TouchableOpacity style={styles.moodButton} onPress={() => onPress(mood)}>
        <Animated.View style={{transform: [{translateY: yOffset}]}}>

      <View>{getBtnEmodji(mood)}</View>
        </Animated.View>
      <Text style={styles.moodText}>
        {mood.charAt(0).toUpperCase() + mood.slice(1)}
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
    flexDirection: 'row',
    gap: 20,
  },
  moodText: {
    fontSize: 22,
    color: '#FF1FA5',
    fontWeight: '800',
  },
});

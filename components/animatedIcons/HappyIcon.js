import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

const HappyIcon = () => {
  return (
    <Text style={styles.emoji}>😊</Text>
  );
};

export default HappyIcon;

const styles = StyleSheet.create({
  emoji: {
    fontSize: 32,
  },
});
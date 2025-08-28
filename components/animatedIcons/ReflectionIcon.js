import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

const ReflectionIcon = () => {
  return (
    <Text style={styles.emoji}>🤔</Text>
  );
};

export default ReflectionIcon;

const styles = StyleSheet.create({
  emoji: {
    fontSize: 32,
  },
});

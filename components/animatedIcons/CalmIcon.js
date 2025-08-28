import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

const CalmIcon = () => {
  return (
    <Text style={styles.emoji}>🧘</Text>
  );
};

export default CalmIcon;

const styles = StyleSheet.create({
  emoji: {
    fontSize: 32,
  },
});

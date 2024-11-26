import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActionButton = ({ 
    text, 
    onPress, 
    disabled, 
    isCountdown, 
    style 
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.mainButton,
          isCountdown && styles.countdownButton,
          disabled && styles.disabledButton,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.mainButtonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

export default ActionButton

const styles = StyleSheet.create({
    mainButton: {
      backgroundColor: '#FF1FA5',
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 15,
      marginRight: 10,
      height: 42,
      justifyContent: 'center',
      minWidth: 100,
    },
    mainButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
      width: 140,
    },
    countdownButton: {
      backgroundColor: '#4CAF50',
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
  });
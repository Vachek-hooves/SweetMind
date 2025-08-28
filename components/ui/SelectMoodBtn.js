import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CalmIcon, HappyIcon, ReflectionIcon} from '../animatedIcons';
import {colors} from '../../theme/colors';

const SelectMoodBtn = ({mood, onPress}) => {
  const getIcon = () => {
    switch (mood) {
      case 'happy':
        return <HappyIcon />;
      case 'calm':
        return <CalmIcon />;
      case 'reflective':
        return <ReflectionIcon />;
      default:
        return null;
    }
  };

  const getMoodText = () => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };

  return (
    <TouchableOpacity
      style={styles.moodButton}
      onPress={() => onPress(mood)}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.moodText}>{getMoodText()}</Text>
    </TouchableOpacity>
  );
};

export default SelectMoodBtn;

const styles = StyleSheet.create({
  moodButton: {
    backgroundColor: colors.buttons.primary,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent.pureWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  moodText: {
    fontSize: 22,
    color: colors.text.primary,
    fontWeight: '800',
  },
});

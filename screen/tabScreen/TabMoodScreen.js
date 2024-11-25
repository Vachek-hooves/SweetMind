import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import {useNavigation} from '@react-navigation/native';
import {CalmIcon} from '../../components/animatedIcons';
import ActionCard from '../../components/ui/ActionCard';
import SelectMoodBtn from '../../components/ui/SelectMoodBtn';

const moods = ['happy', 'calm', 'reflective'];

const TabMoodScreen = () => {
  const navigation = useNavigation();

  const handleMoodSelect = mood => {
    navigation.navigate('StackFeelingMoodScreen', {mood});
  };
  const getNextQuote = () => {};

  return (
    <MainTabLayout>
      <CustomLinearGradient>
        <View style={styles.container}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              style={styles.profileImage}
              // source={require('../../assets/images/profile.png')}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.nickname}>Nickname</Text>
              <Text style={styles.age}>21 year</Text>
            </View>
          </View>

          {/* Daily Quote Card */}

          <ActionCard
            title="Happy Quote"
            content={'Every day brings new opportunities to shine.'}
            mainButtonText="New quote"
            onMainButtonPress={getNextQuote}
          />

          {/* Mood Selection Section */}
          <View style={styles.moodSection}>
            <Text style={styles.moodTitle}>
              How are you{'\n'} feeling today?
            </Text>
            {moods.map(mood => (
              <SelectMoodBtn
                key={mood}
                mood={mood}
                onPress={handleMoodSelect}
              />
            ))}
          </View>

          {/* Date Display */}
          <Text style={styles.dateText}>12.03.2024</Text>
        </View>
      </CustomLinearGradient>
    </MainTabLayout>
  );
};

export default TabMoodScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 10,
  },
  nickname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  age: {
    fontSize: 14,
    color: '#fff',
  },

  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 22,
    borderColor: '#FF1FA5',
  },
  moodSection: {
    marginBottom: 30,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  // moodButton: {
  //   backgroundColor: '#fff',
  //   borderRadius: 24,
  //   padding: 15,
  //   marginBottom: 10,
  // },
  // moodText: {
  //   fontSize: 22,
  //   color: '#FF1FA5',
  //   fontWeight: '800',
  // },
  dateText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

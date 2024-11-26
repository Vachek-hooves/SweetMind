import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import SelectMoodBtn from '../../components/ui/SelectMoodBtn';
import CurrentDate from '../../utils/CurrentDate';
import UserCard from '../../components/UserData/UserCard';
import DayliQuote from '../../components/ui/DayliQuote';

const moods = ['happy', 'calm', 'reflective'];

const TabMoodScreen = () => {
  const navigation = useNavigation();

  const handleMoodSelect = mood => {
    navigation.navigate('StackFeelingMoodScreen', {mood});
  };

  return (
    <MainTabLayout>
      <CustomLinearGradient>
        <View style={styles.container}>
          <UserCard />

          <DayliQuote />

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

          <CurrentDate />
        </View>
        <View style={{height: 110}} />
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
  dateText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getBtnEmodji} from '../../data/btnEmodji';

const SelectMoodBtn = ({mood, onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.moodButton} onPress={() => onPress(mood)}>
      <View>{getBtnEmodji(mood)}</View>
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
    // justifyContent: 'center',
    // alignSelf: 'center',
    // textAlign: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  moodText: {
    fontSize: 22,
    color: '#FF1FA5',
    fontWeight: '800',
  },
});

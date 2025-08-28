import {Text, StyleSheet, View} from 'react-native';
import {colors} from '../theme/colors';

const CurrentDate = ({style}) => {
  const getCurrentDate = () => {
    const date = new Date();
    return date
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
      })
      .split('/')
      .join('.');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.dateText, style]}>{getCurrentDate()}</Text>
    </View>
  );
};

export default CurrentDate;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.primary.swetTeal,
    alignSelf: 'center',
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

import {Text, StyleSheet} from 'react-native';

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

  return <View style={styles.container}>

<Text style={[styles.dateText, style]}>{getCurrentDate()}</Text>;
  </View>
};

export default CurrentDate;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

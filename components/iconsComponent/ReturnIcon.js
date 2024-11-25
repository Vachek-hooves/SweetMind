import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReturnIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <Icon name="arrow-left" size={36} color="#FF1FA5" />
    </TouchableOpacity>
  );
};

export default ReturnIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  icon: {
    color: '#FF1FA5',
    padding: 10,
  },
});

import {StyleSheet, Text, View, Image} from 'react-native';
import {getUserData} from '../../utils/userData';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
const UserCard = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };
    
    loadUserData();
    // Add focus listener to refresh data when screen is focused
    const unsubscribe = navigation.addListener('focus', loadUserData);
    
    return () => unsubscribe();
  }, []);
  
  return (
    <View style={styles.profileSection}>
      <View style={styles.profileInfo}>
        <Image
          source={{uri: userData?.profileImage}}
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{userData?.nickname}</Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
  },
  profileInfo: {
    marginLeft: 10,
    flexDirection: 'row',

    alignItems: 'center',
    gap: 20,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

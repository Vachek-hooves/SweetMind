import {StyleSheet, Text, View, Image} from 'react-native';
import {getUserData} from '../../utils/userData';
import {useState, useEffect} from 'react';

const UserCard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData().then(data => setUserData(data));
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

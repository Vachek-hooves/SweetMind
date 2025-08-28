import {StyleSheet, Text, View, Image} from 'react-native';
import {getUserData} from '../../utils/userData';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../theme/colors';

const UserCard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
    const unsubscribe = navigation.addListener('focus', loadUserData);
    
    return () => unsubscribe();
  }, [navigation]);
  
  if (isLoading) {
    return (
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.placeholderImage} />
          <Text style={styles.nickname}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!userData || !userData.profileImage) {
    return (
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.placeholderImage} />
          <Text style={styles.nickname}>
            {userData?.nickname || 'Guest User'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.profileSection}>
      <View style={styles.profileInfo}>
        <Image
          source={{uri: userData.profileImage}}
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{userData.nickname}</Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  profileSection: {
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.borders.primary,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.buttons.secondary,
    borderWidth: 2,
    borderColor: colors.borders.primary,
  },
  nickname: {
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});

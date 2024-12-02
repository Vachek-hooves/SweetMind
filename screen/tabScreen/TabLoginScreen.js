import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import WelcomeLayout from '../../components/Layout/WelcomeLayout';

const TabLoginScreen = () => {
  const [userData, setUserData] = useState({
    nickname: '',
    profileImage: null,
  });
  const [isProfileSet, setIsProfileSet] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUserData = await AsyncStorage.getItem('userData');
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
        setIsProfileSet(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setUserData(prev => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const handleSave = async () => {
    if (!userData.nickname.trim() || !userData.profileImage) {
      Alert.alert('Error', 'Please provide both nickname and profile image');
      return;
    }

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        setIsProfileSet(true);
      }, 3000);
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleEdit = () => {
    setIsProfileSet(false);
  };

  if (showAnimation) {
    return (
      <MainTabLayout>
        <CustomLinearGradient>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../../assets/animations/flyYogaMood.json')}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            />
          </View>
        </CustomLinearGradient>
      </MainTabLayout>
    );
  }

  if (isProfileSet) {
    return (
      <WelcomeLayout>
        {/* <MainTabLayout> */}
          <CustomLinearGradient>
            <View style={styles.container}>
              <View style={styles.profileContainer}>
                <TouchableOpacity
                  onPress={handleEdit}
                  style={styles.imageContainer}>
                  <Image
                    source={{uri: userData.profileImage}}
                    style={styles.profileImage}
                  />
                  <View style={styles.editIconOverlay}>
                    <Icon name="edit" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleEdit}
                  style={styles.nameContainer}>
                  <Text style={styles.profileName}>{userData.nickname}</Text>
                  <Icon
                    name="edit"
                    size={20}
                    color="#fff"
                    style={styles.nameEditIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </CustomLinearGradient>
        {/* </MainTabLayout> */}
      </WelcomeLayout>
    );
  }

  return (
    // <WelcomeLayout>
      <MainTabLayout>
      <CustomLinearGradient>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.imageContainer}>
          {userData.profileImage ? (
            <>
              <Image
                source={{uri: userData.profileImage}}
                style={styles.profileImage}
              />
              <View style={styles.editIconOverlay}>
                <Icon name="edit" size={24} color="#fff" />
              </View>
            </>
          ) : (
            <View style={styles.placeholderImage}>
              <Icon name="add-a-photo" size={40} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.title}>Set up your profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Your nickname"
          value={userData.nickname}
          onChangeText={text =>
            setUserData(prev => ({...prev, nickname: text}))
          }
          placeholderTextColor="#rgba(255,255,255,0.7)"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 100}} />
      </CustomLinearGradient>
      </MainTabLayout>
    // </WelcomeLayout>
  );
};

export default TabLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 30,
  },
  profileImage: {
    width: 220,
    height: 220,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  placeholderImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  saveButton: {
    width: '100%',
    height: 50,
    // backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  saveButtonText: {
    // color: '#ff69b4',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 22,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  nameEditIcon: {
    marginLeft: 8,
  },
  editIconOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
});

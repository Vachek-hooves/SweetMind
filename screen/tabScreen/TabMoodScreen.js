import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MainTabLayout from '../../components/Layout/MainTabLayout'
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient'
import { useNavigation } from '@react-navigation/native'

const TabMoodScreen = () => {
  const navigation = useNavigation()

  const handleMoodSelect = (mood) => {
    navigation.navigate('StackFeelingMoodScreen', { mood })
  }

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
          <View style={styles.quoteCard}>
            <Text style={styles.quoteTitle}>Daily Quote</Text>
            <Text style={styles.quoteText}>
              Every day brings new opportunities to shine.
            </Text>
            <View style={styles.quoteActions}>
              <TouchableOpacity style={styles.quoteButton}>
                <Text style={styles.buttonText}>New quote</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text>🔄</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text>👍</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mood Selection Section */}
          <View style={styles.moodSection}>
            <Text style={styles.moodTitle}>How are you feeling today?</Text>
            
            <TouchableOpacity 
              style={styles.moodButton}
              onPress={() => handleMoodSelect('happy')}
            >
              <Text style={styles.moodText}>😊 Happy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.moodButton}
              onPress={() => handleMoodSelect('calm')}
            >
              <Text style={styles.moodText}>😌 Calm</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.moodButton}
              onPress={() => handleMoodSelect('reflective')}
            >
              <Text style={styles.moodText}>🤔 Reflective</Text>
            </TouchableOpacity>
          </View>

          {/* Date Display */}
          <Text style={styles.dateText}>12.03.2024</Text>
        </View>
      </CustomLinearGradient>
    </MainTabLayout>
  )
}

export default TabMoodScreen

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
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
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  quoteTitle: {
    fontSize: 16,
    color: '#FF68A8',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  quoteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteButton: {
    backgroundColor: '#FF68A8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
  },
  moodSection: {
    marginBottom: 30,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  moodButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  moodText: {
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
})
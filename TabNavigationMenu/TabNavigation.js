import React, { useState, useEffect } from 'react';
import {StyleSheet, View, TouchableOpacity, AppState} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  TabDoneTasks,
  TabFavoriteScreen,
  TabLoginScreen,
  TabMoodScreen,
} from '../screen/tabScreen';
import {pauseBackgroundMusic, playBackgroundMusic, setupPlayer, toggleBackgroundMusic} from '../components/audio/setupPlayer';


const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Setup audio player when component mounts
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlaying) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });
    const initMusic = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsPlaying(true);
    };

    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const handleMusicToggle = () => {
    const updatedState=toggleBackgroundMusic()
    setIsPlaying(updatedState);
    // Add your music play/pause logic here
  };

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            // Handle music control separately
            if (route.name === 'Sound') {
              handleMusicToggle();
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          switch (route.name) {
            case 'TabLoginScreen':
              iconName = 'settings';
              break;
            case 'TabMoodScreen':
              iconName = 'home';
              break;
            case 'TabFavoriteScreen':
              iconName = 'thumb-up';
              break;
            case 'Sound':
              // Use different icon based on playing state
              iconName = isPlaying ? 'music-note' : 'music-off';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
              <Icon
                name={iconName}
                size={28}
                color={isFocused || (route.name === 'Sound' && isPlaying) ? '#FF1FA5' : '#666'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="TabLoginScreen" component={TabLoginScreen} />
      <Tab.Screen name="TabMoodScreen" component={TabMoodScreen} />
      <Tab.Screen name="TabFavoriteScreen" component={TabFavoriteScreen} />
      <Tab.Screen 
        name="Sound" 
        component={EmptyComponent}
        listeners={{
          tabPress: (e) => {
            // Prevent navigation
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
};

const EmptyComponent = () => null;

export default TabNavigation;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 80,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
 
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabItemFocused: {
    // Add any additional styles for focused state
  },
});

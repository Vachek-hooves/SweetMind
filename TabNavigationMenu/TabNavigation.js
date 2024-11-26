import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  TabDoneTasks,
  TabFavoriteScreen,
  TabLoginScreen,
  TabMoodScreen,
} from '../screen/tabScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
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
            case 'TabDoneTasks':
              iconName = 'check-circle';
              break;
            case 'TabFavoriteScreen':
              iconName = 'favorite';
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
                size={42}
                color={isFocused ? '#FF1FA5' : '#666'}
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
      {/* <Tab.Screen name="TabDoneTasks" component={TabDoneTasks} /> */}
      <Tab.Screen name="TabFavoriteScreen" component={TabFavoriteScreen} />
    </Tab.Navigator>
  );
};

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

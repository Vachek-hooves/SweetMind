import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabDoneTasks,
  TabFavoriteQuotes,
  TabFavoriteScreen,
  TabLoginScreen,
  TabMoodScreen,
  TabStatisticScreen,
} from '../screen/tabScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabLoginScreen" component={TabLoginScreen} />
      <Tab.Screen name="TabMoodScreen" component={TabMoodScreen} />
      {/* <Tab.Screen name="TabStatisticScreen" component={TabStatisticScreen} /> */}
      <Tab.Screen name="TabDoneTasks" component={TabDoneTasks} />
      {/* <Tab.Screen name="TabFavoriteQuotes" component={TabFavoriteQuotes} /> */}
      <Tab.Screen name='TabFavoriteScreen' component={TabFavoriteScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});

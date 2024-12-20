import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AppContext} from './store/context';
import {StackFeelingMoodScreen, WelcomeScreen} from './screen/stackScreen';
import TabNavigation from './TabNavigationMenu/TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigation} />
          <Stack.Screen
            name="StackFeelingMoodScreen"
            component={StackFeelingMoodScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
}

export default App;

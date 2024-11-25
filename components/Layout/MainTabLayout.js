import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainTabLayout = ({children}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );
};

export default MainTabLayout;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

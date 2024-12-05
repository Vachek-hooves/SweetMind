import {StyleSheet, ImageBackground} from 'react-native';

const MainTabLayout = ({children}) => {
  return (
    <ImageBackground
      // source={require('../../assets/image/bg/bg.png')}
      // source={require('../../assets/image/bg/mindBG.png')}
      source={require('../../assets/image/bg/bg2.jpg')}
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

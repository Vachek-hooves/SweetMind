import {StyleSheet, ImageBackground} from 'react-native';

const WelcomeLayout = ({children}) => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/image/bg/bg.png')}>
      {children}
    </ImageBackground>
  );
};

export default WelcomeLayout;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

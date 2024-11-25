import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const CalmIcon = ({width, height}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/happySmile.json')}
        autoPlay
        loop
        // style={{width, height}}

        style={styles.icon}
      />
      {/* <Text style={styles.text}>Calm</Text> */}
    </View>
  );
};

export default CalmIcon;

const styles = StyleSheet.create({
  //   icon: {
  //     width: width,
  //     height: height,
  //   },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 19,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
});

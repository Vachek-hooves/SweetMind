import {ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomLinearGradient = ({children}) => {
  return (
    <LinearGradient
      colors={[
        // 'transparent',
        'rgba(255, 104, 168, 0)',
        'rgba(255, 104, 168, 0.6)',
        'rgba(255, 104, 168, 0.9)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        'rgba(255, 104, 168, 1)',
        // '#FF68A8',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.1, 0.2, 0.3, 0.5, 0.5, 0.7, 1]}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      {/* <View style={{height: 110}} /> */}
    </LinearGradient>
  );
};

export default CustomLinearGradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    marginTop:'10%',
    // paddingTop: '10%',
  },
  scroll: {
    flexGrow: 1,
    marginBottom: 110,
    
  },
});

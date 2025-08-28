import {ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';

const CustomLinearGradient = ({children}) => {
  return (
    <LinearGradient
      colors={colors.gradients.primary}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.1, 0.2, 0.3, 0.5, 0.6, 0.8, 1]}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

export default CustomLinearGradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
});

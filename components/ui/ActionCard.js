import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ActionCard = ({title, content, mainButtonText, onMainButtonPress}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.mainButton} onPress={onMainButtonPress}>
          <Text style={styles.mainButtonText}>{mainButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>�</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>👍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 22,
    color: '#FF1FA5',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#FF1FA5',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#FF1FA5',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 42,
    justifyContent: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 22,
    borderColor: '#FF1FA5',
  },
  iconText: {
    fontSize: 18,
  },
});

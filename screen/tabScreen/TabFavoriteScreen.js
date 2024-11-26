import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,

} from 'react-native';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import {useAppContext} from '../../store/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {getMoodEmoji} from '../../data/moodEmodji';
import {getBtnEmodji} from '../../data/btnEmodji';
const FavoriteItem = ({item, onRemove}) => {
  return (
    <View style={styles.favoriteItem}>
      <Text style={styles.favoriteType}>
        {item.type === 'task' ? 'Saved Tasks' : 'Saved Quotes'}
      </Text>
      <Text style={styles.favoriteContent}>{item.content}</Text>
      <View style={styles.buttonContainer}>
        {item.type === 'task' && (
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share" size={20} color="#FF1FA5" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => onRemove(item.id)}>
          <Icon name="thumbs-up" size={20} color="#FF1FA5" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EmptyState = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyStateText}>
      No favorites yet. Start adding some!
    </Text>
  </View>
);

const TabFavoriteScreen = () => {
  const {favorites, removeFromFavorites} = useAppContext();

  const handleRemove = async id => {
    await removeFromFavorites(id);
  };

  const renderItem = ({item}) => (
    <FavoriteItem item={item} onRemove={handleRemove} />
  );

  return (
    <MainTabLayout>
      {/* <CustomLinearGradient> */}
      <LinearGradient
        colors={[
          // 'transparent',
          'rgba(255, 104, 168, 0.2)',
          'rgba(255, 104, 168, 0.7)',
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
        <View style={styles.container}>
          <Text style={styles.title}>My Favorites</Text>

          <FlatList
            data={favorites}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={[
              styles.listContainer,
              favorites.length === 0 && styles.emptyListContainer,
            ]}
            ListEmptyComponent={EmptyState}
            showsVerticalScrollIndicator={false}
            bounces={true}
            overScrollMode="never"
          />
        </View>
        {/* </CustomLinearGradient> */}
        <View style={{height:110}}></View>
      </LinearGradient>
    </MainTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    marginTop:50
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  favoriteItem: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  favoriteType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1FA5',
    marginBottom: 10,
  },
  favoriteContent: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  doneButton: {
    backgroundColor: '#FF1FA5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    flex: 1,
  },
  doneButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  iconButton: {
    backgroundColor: 'rgba(255, 31, 165, 0.1)',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  emptyStateText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  linearGradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
});

export default TabFavoriteScreen;

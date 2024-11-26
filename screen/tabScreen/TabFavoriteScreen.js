import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import {useAppContext} from '../../store/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {getMoodEmoji} from '../../data/moodEmodji';

const FavoriteItem = ({item, onRemove}) => {
  return (
    <View style={styles.favoriteItem}>
      <View style={styles.favoriteHeader}>
        <Text style={styles.favoriteType}>
          {item.type === 'task' ? '📋 Task' : '💭 Quote'}
        </Text>
        <Text style={styles.moodEmoji}>{getMoodEmoji(item.mood)}</Text>
      </View>

      <Text style={styles.favoriteContent}>{item.content}</Text>

      <View style={styles.favoriteFooter}>
        <Text style={styles.favoriteDate}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}>
          <Icon name="trash" size={20} color="#FF1FA5" />
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
      </LinearGradient>
    </MainTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
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
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  favoriteType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1FA5',
  },
  moodEmoji: {
    fontSize: 20,
  },
  favoriteContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  favoriteDate: {
    color: '#666',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 31, 165, 0.1)',
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

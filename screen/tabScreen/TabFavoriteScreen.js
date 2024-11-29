import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MainTabLayout from '../../components/Layout/MainTabLayout';
import CustomLinearGradient from '../../components/styledComponents/CustomLinearGradient';
import {useAppContext} from '../../store/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {getMoodEmoji} from '../../data/moodEmodji';
import {getBtnEmodji} from '../../data/btnEmodji';
import MoodStatistics from '../../components/FavoriteScreenComponents/MoodStatistics';

const PaginationDots = ({currentIndex, total}) => {
  return (
    <View style={styles.paginationContainer}>
      {[...Array(total)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );
};

const FavoriteSection = ({items, type, onRemove}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / Dimensions.get('window').width);
    setCurrentIndex(index);
  };

  if (!items.length) return null;

  return (
    <View style={styles.sectionContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}>
        {items.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteType}>
                {type === 'task' ? 'Saved Tasks' : 'Saved Quotes'}
              </Text>
              <Text style={styles.favoriteContent}>{item.content}</Text>
              <View style={styles.buttonContainer}>
                {type === 'task' && (
                  <TouchableOpacity style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                )}
                {/* <TouchableOpacity style={styles.iconButton}>
                  <Icon name="share" size={20} color="#FF1FA5" />
                </TouchableOpacity> */}
                {type === 'quote' && (
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => onRemove(item.id)}>
                    <Icon name="trash" size={20} color="#FF1FA5" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <PaginationDots currentIndex={currentIndex} total={items.length} />
    </View>
  );
};

const TabFavoriteScreen = () => {
  const {favorites, removeFromFavorites, moodStats} = useAppContext();

  console.log(moodStats);
  const tasks = favorites.filter(item => item.type === 'task');
  const quotes = favorites.filter(item => item.type === 'quote');

  const handleRemove = async id => {
    await removeFromFavorites(id);
  };

  return (
    <MainTabLayout>
      <LinearGradient
        colors={[
          'rgba(255, 104, 168, 0.2)',
          'rgba(255, 104, 168, 0.7)',
          'rgba(255, 104, 168, 0.9)',
          'rgba(255, 104, 168, 1)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.linearGradient}>
        <ScrollView
          contentContainerStyle={{marginTop: 50}}
          style={{marginTop:50}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Saved</Text>

            <FavoriteSection
              items={quotes}
              type="quote"
              onRemove={handleRemove}
            />
            <FavoriteSection
              items={tasks}
              type="task"
              onRemove={handleRemove}
            />
          </View>
          <MoodStatistics />
        </ScrollView>
        <View style={{height: 110}} />
      </LinearGradient>
    </MainTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    marginTop: 50,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  favoriteItem: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    height: 200,
    justifyContent: 'space-between',
  },
  favoriteType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1FA5',
    marginBottom: 15,
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
    gap: 15,
  },
  doneButton: {
    backgroundColor: '#FF1FA5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
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
    width: 45,
    height: 45,
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
  sectionContainer: {
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 0,
  },
  cardContainer: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 250,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});

export default TabFavoriteScreen;

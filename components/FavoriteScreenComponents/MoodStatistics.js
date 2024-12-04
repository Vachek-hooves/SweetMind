import React, { useMemo, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal,
  Pressable 
} from 'react-native';
import { useAppContext } from '../../store/context';
import { getBtnEmodji } from '../../data/btnEmodji';
import Icon from 'react-native-vector-icons/FontAwesome';

const PERIODS = ['Day', 'Week', 'Month'];

const PeriodSelector = ({ selectedPeriod, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity 
        style={styles.periodSelector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.periodText}>{selectedPeriod}</Text>
        <Icon name="chevron-down" size={12} color="#666" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {PERIODS.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodOption,
                  selectedPeriod === period && styles.selectedPeriod
                ]}
                onPress={() => {
                  onSelect(period);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.periodOptionText,
                  selectedPeriod === period && styles.selectedPeriodText
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const StatBar = ({ percentage, mood, color }) => (
  <View style={styles.statBarContainer}>
    <Text style={styles.percentageText}>{percentage}%</Text>
    <View style={[styles.statBar, { backgroundColor: color, width: `${percentage}%` }]}>
      <View style={styles.emojiContainer}>
        {getBtnEmodji(mood)}
      </View>
    </View>
  </View>
);

const MoodStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const { moodStats } = useAppContext();

  const statistics = useMemo(() => {
    if (!moodStats || Object.keys(moodStats).length === 0) {
      return [];
    }

    const now = new Date();
    const filterDate = (date) => {
      const itemDate = new Date(date);
      switch (selectedPeriod) {
        case 'Day':
          return itemDate.toDateString() === now.toDateString();
        case 'Week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return itemDate >= weekAgo;
        case 'Month':
          return itemDate.getMonth() === now.getMonth() && 
                 itemDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    };

    // Calculate totals for the selected period
    const periodTotals = {};
    Object.entries(moodStats).forEach(([mood, data]) => {
      const periodTotal = Object.entries(data.byDate || {})
        .filter(([date]) => filterDate(date))
        .reduce((sum, [_, count]) => sum + count, 0);
      periodTotals[mood] = periodTotal;
    });

    const total = Object.values(periodTotals).reduce((sum, count) => sum + count, 0);

    // Calculate percentages
    const stats = Object.entries(periodTotals)
      .map(([mood, count]) => ({
        mood,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return stats;
  }, [moodStats, selectedPeriod]);

  const moodColors = {
    happy: '#FFB347',
    calm: '#77DD77',
    reflective: '#79BAEC',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      
      <PeriodSelector 
        selectedPeriod={selectedPeriod}
        onSelect={setSelectedPeriod}
      />

      <View style={styles.statsContainer}>
        {statistics.map(({ mood, percentage }) => (
          <StatBar
            key={mood}
            percentage={percentage}
            mood={mood}
            color={moodColors[mood]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1FA5',
    marginBottom: 15,
    textAlign: 'center',
  },
  periodSelector: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  periodText: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    gap: 15,
  },
  statBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '80%',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 50,
  },
  statBar: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    minWidth: 40,
  },
  emojiContainer: {
    position: 'absolute',
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    width: '80%',
    maxWidth: 300,
  },
  periodOption: {
    padding: 15,
    borderRadius: 10,
  },
  selectedPeriod: {
    backgroundColor: 'rgba(255, 31, 165, 0.1)',
  },
  periodOptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  selectedPeriodText: {
    color: '#FF1FA5',
    fontWeight: '600',
  },
});

export default MoodStatistics;
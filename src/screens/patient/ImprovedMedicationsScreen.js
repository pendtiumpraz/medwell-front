import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');

// Responsive padding - consistent with other screens
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function ImprovedMedicationsScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('today');

  // Mock data
  const todayMedications = [
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      time: '08:00 AM',
      taken: true,
      takenAt: '08:05 AM',
      type: 'tablet',
      notes: 'Take with food',
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: '1000 IU',
      time: '08:00 AM',
      taken: true,
      takenAt: '08:05 AM',
      type: 'capsule',
      notes: '',
    },
    {
      id: 3,
      name: 'Blood Pressure Medication',
      dosage: '10mg',
      time: '08:00 PM',
      taken: false,
      type: 'tablet',
      notes: 'Do not skip',
    },
  ];

  const allMedications = [
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once daily',
      times: ['08:00 AM'],
      active: true,
      prescribedBy: 'Dr. John Smith',
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      times: ['08:00 AM'],
      active: true,
      prescribedBy: 'Dr. Sarah Johnson',
    },
    {
      id: 3,
      name: 'Blood Pressure Med',
      dosage: '10mg',
      frequency: 'Twice daily',
      times: ['08:00 AM', '08:00 PM'],
      active: true,
      prescribedBy: 'Dr. John Smith',
    },
  ];

  const handleMarkTaken = (medId) => {
    Alert.alert(
      'Confirm',
      'Mark this medication as taken?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Taken',
          onPress: () => {
            // TODO: Call API
            console.log('Marked as taken:', medId);
            Alert.alert('Success', 'Medication marked as taken!');
          },
        },
      ]
    );
  };

  const handleSkip = (medId) => {
    Alert.alert(
      'Skip Medication',
      'Are you sure you want to skip this medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            // TODO: Call API
            console.log('Skipped:', medId);
          },
        },
      ]
    );
  };

  const renderTodayMedication = (med) => {
    return (
      <View key={med.id} style={[styles.medCard, med.taken && styles.medCardTaken]}>
        <View style={styles.medLeft}>
          <View style={[styles.medIcon, { backgroundColor: med.taken ? COLORS.green100 : COLORS.blue100 }]}>
            <Icon 
              name={med.type === 'tablet' ? 'pill' : 'capsule'} 
              size={24} 
              color={med.taken ? COLORS.green600 : COLORS.primary} 
            />
          </View>
          <View style={styles.medInfo}>
            <Text style={[styles.medName, med.taken && styles.medNameTaken]}>{med.name}</Text>
            <Text style={styles.medDosage}>{med.dosage}</Text>
            <View style={styles.medMeta}>
              <Icon name="clock-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.medTime}>{med.time}</Text>
            </View>
            {med.notes && (
              <Text style={styles.medNotes}>📋 {med.notes}</Text>
            )}
            {med.taken && (
              <View style={styles.takenBadge}>
                <Icon name="check-circle" size={14} color={COLORS.green600} />
                <Text style={styles.takenText}>Taken at {med.takenAt}</Text>
              </View>
            )}
          </View>
        </View>
        
        {!med.taken && (
          <View style={styles.medActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.skipButton]}
              onPress={() => handleSkip(med.id)}
            >
              <Icon name="close" size={16} color={COLORS.gray600} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.takeButton]}
              onPress={() => handleMarkTaken(med.id)}
            >
              <Icon name="check" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderAllMedication = (med) => {
    return (
      <TouchableOpacity key={med.id} style={styles.allMedCard}>
        <View style={styles.allMedLeft}>
          <View style={[styles.medIcon, { backgroundColor: COLORS.purple100 }]}>
            <Icon name="pill" size={24} color={COLORS.purple600} />
          </View>
          <View style={styles.allMedInfo}>
            <Text style={styles.allMedName}>{med.name}</Text>
            <Text style={styles.allMedDosage}>{med.dosage} • {med.frequency}</Text>
            <View style={styles.timesContainer}>
              {med.times.map((time, index) => (
                <View key={index} style={styles.timeChip}>
                  <Text style={styles.timeChipText}>{time}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.prescriber}>Prescribed by {med.prescribedBy}</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={24} color={COLORS.gray400} />
      </TouchableOpacity>
    );
  };

  const takenCount = todayMedications.filter(m => m.taken).length;
  const totalCount = todayMedications.length;
  const progressPercent = (takenCount / totalCount) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Medications</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="plus" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        {selectedTab === 'today' && (
          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Today's Progress</Text>
              <Text style={styles.progressCount}>{takenCount} of {totalCount} taken</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        )}
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'today' && styles.tabActive]}
          onPress={() => setSelectedTab('today')}
        >
          <Text style={[styles.tabText, selectedTab === 'today' && styles.tabTextActive]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
            All Medications
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'today' ? (
          <View style={styles.section}>
            {todayMedications.map(renderTodayMedication)}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Medications ({allMedications.length})</Text>
            {allMedications.map(renderAllMedication)}
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
    paddingTop: 50,
    paddingBottom: width < 340 ? 14 : (width < 380 ? 16 : 20),
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  progressCount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: COLORS.primary + '15',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 16 : 20,
  },
  sectionTitle: {
    fontSize: width < 340 ? 14 : (width < 380 ? 15 : 16),
    fontWeight: '700',
    color: COLORS.gray700,
    marginBottom: width < 340 ? 10 : 12,
  },
  medCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    alignSelf: 'stretch', // Stretch full width
  },
  medCardTaken: {
    borderLeftColor: COLORS.green600,
    opacity: 0.7,
  },
  medLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  medIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  medNameTaken: {
    textDecorationLine: 'line-through',
    color: COLORS.gray600,
  },
  medDosage: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 6,
  },
  medMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  medTime: {
    fontSize: 13,
    color: COLORS.gray600,
  },
  medNotes: {
    fontSize: 12,
    color: COLORS.orange600,
    marginTop: 4,
  },
  takenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  takenText: {
    fontSize: 12,
    color: COLORS.green600,
    fontWeight: '500',
  },
  medActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    backgroundColor: COLORS.gray100,
  },
  takeButton: {
    backgroundColor: COLORS.green600,
  },
  allMedCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    marginBottom: 12,
    alignItems: 'center',
    alignSelf: 'stretch', // Stretch full width
  },
  allMedLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  allMedInfo: {
    flex: 1,
  },
  allMedName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  allMedDosage: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 8,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  timeChip: {
    backgroundColor: COLORS.blue100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeChipText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
  prescriber: {
    fontSize: 12,
    color: COLORS.gray500,
  },
});

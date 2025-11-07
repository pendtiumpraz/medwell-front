import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

// Responsive padding dan gap - TETAP untuk semua ukuran
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);
const CARD_GAP = width < 340 ? 8 : (width < 380 ? 10 : 12);

// Card width calculation - grows with screen, gap stays same
const calculateCardWidth = () => {
  const availableWidth = width - (HORIZONTAL_PADDING * 2);
  const cardWidth = (availableWidth - CARD_GAP) / 2;
  
  // Set minimum width untuk very small screens
  const MIN_CARD_WIDTH = 130; // Minimum untuk 300px screens
  
  // No max limit - let cards grow on large screens
  return Math.max(MIN_CARD_WIDTH, cardWidth);
};

const CARD_WIDTH = calculateCardWidth();

export default function ImprovedDashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    wellnessScore: 85,
    todaySteps: 6847,
    goalSteps: 10000,
    heartRate: 72,
    bloodPressure: '120/80',
    sleepHours: 7.5,
    calories: 342,
    todayMeds: 3,
    takenMeds: 2,
    upcomingAppointments: 1,
    unreadMessages: 2,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // TODO: Replace with real API when ready
    console.log('Loading dashboard data...');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stepsProgress = (dashboardData.todaySteps / dashboardData.goalSteps) * 100;
  const medsProgress = (dashboardData.takenMeds / dashboardData.todayMeds) * 100;

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>{user?.full_name || user?.username || 'User'}</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="bell-outline" size={26} color={COLORS.white} />
            {dashboardData.unreadMessages > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{dashboardData.unreadMessages}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Wellness Score */}
        <View style={styles.wellnessCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{dashboardData.wellnessScore}</Text>
            <Text style={styles.scoreLabel}>Wellness</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>Great Progress!</Text>
            <Text style={styles.scoreDesc}>Keep up the good work!</Text>
            <View style={styles.scoreStats}>
              <View style={styles.scoreStat}>
                <Icon name="walk" size={16} color={COLORS.white} />
                <Text style={styles.scoreStatText}>68% goal</Text>
              </View>
              <View style={styles.scoreStat}>
                <Icon name="heart-pulse" size={16} color={COLORS.white} />
                <Text style={styles.scoreStatText}>Normal</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Vitals')}
            >
              <LinearGradient
                colors={['#FF6B6B', '#EE5A52']}
                style={styles.actionGradient}
              >
                <Icon name="heart-pulse" size={width < 340 ? 24 : 28} color={COLORS.white} />
                <Text style={styles.actionText}>Log Vitals</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Medications')}
            >
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.actionGradient}
              >
                <Icon name="pill" size={width < 340 ? 24 : 28} color={COLORS.white} />
                <Text style={styles.actionText}>Medications</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Wearables')}
            >
              <LinearGradient
                colors={['#A8E6CF', '#56AB91']}
                style={styles.actionGradient}
              >
                <Icon name="watch" size={width < 340 ? 24 : 28} color={COLORS.white} />
                <Text style={styles.actionText}>Sync Device</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Profile')}
            >
              <LinearGradient
                colors={['#FFD93D', '#F6B93B']}
                style={styles.actionGradient}
              >
                <Icon name="calendar-check" size={width < 340 ? 24 : 28} color={COLORS.white} />
                <Text style={styles.actionText}>Appointments</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Activity</Text>
          <View style={styles.statsGrid}>
            {/* Steps Card */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Icon name="walk" size={width < 340 ? 20 : 24} color="#FF6B6B" />
                <Text style={styles.statValue}>{dashboardData.todaySteps.toLocaleString()}</Text>
              </View>
              <Text style={styles.statLabel}>Steps</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${stepsProgress}%`, backgroundColor: '#FF6B6B' }]} />
              </View>
              <Text style={styles.statGoal}>{stepsProgress.toFixed(0)}% of goal</Text>
            </View>

            {/* Heart Rate Card */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Icon name="heart-pulse" size={width < 340 ? 20 : 24} color="#E74C3C" />
                <Text style={styles.statValue}>{dashboardData.heartRate}</Text>
              </View>
              <Text style={styles.statLabel}>Heart Rate</Text>
              <Text style={styles.statUnit}>bpm</Text>
              <Text style={styles.statStatus}>Normal</Text>
            </View>

            {/* Blood Pressure Card */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Icon name="water" size={width < 340 ? 20 : 24} color="#3498DB" />
                <Text style={styles.statValue}>{dashboardData.bloodPressure}</Text>
              </View>
              <Text style={styles.statLabel}>Blood Pressure</Text>
              <Text style={styles.statUnit}>mmHg</Text>
              <Text style={styles.statStatus}>Good</Text>
            </View>

            {/* Sleep Card */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Icon name="sleep" size={width < 340 ? 20 : 24} color="#9B59B6" />
                <Text style={styles.statValue}>{dashboardData.sleepHours}h</Text>
              </View>
              <Text style={styles.statLabel}>Sleep</Text>
              <Text style={styles.statUnit}>last night</Text>
              <Text style={styles.statStatus}>Good</Text>
            </View>
          </View>
        </View>

        {/* Medications Today */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medications Today</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Medications')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.medCard}>
            <View style={styles.medProgress}>
              <View style={[styles.medProgressFill, { width: `${medsProgress}%` }]} />
            </View>
            <View style={styles.medInfo}>
              <Text style={styles.medTitle}>{dashboardData.takenMeds} of {dashboardData.todayMeds} taken</Text>
              <Text style={styles.medDesc}>1 medication remaining for today</Text>
            </View>
            <Icon name="pill" size={32} color={COLORS.primary} />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#E8F5E9' }]}>
                <Icon name="check-circle" size={20} color="#4CAF50" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Medication Taken</Text>
                <Text style={styles.activityTime}>Aspirin 100mg • 2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#FFF3E0' }]}>
                <Icon name="walk" size={20} color="#FF9800" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Daily Walk Completed</Text>
                <Text style={styles.activityTime}>Morning routine • 4 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#F3E5F5' }]}>
                <Icon name="heart-pulse" size={20} color="#9C27B0" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Vitals Logged</Text>
                <Text style={styles.activityTime}>Blood pressure recorded • Yesterday</Text>
              </View>
            </View>
          </View>
        </View>

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
    paddingHorizontal: HORIZONTAL_PADDING, // Consistent dengan section
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width < 340 ? 14 : (width < 380 ? 16 : 20),
  },
  greeting: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 14),
    color: COLORS.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: width < 340 ? 18 : (width < 380 ? 20 : 24),
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  wellnessCard: {
    flexDirection: width < 380 ? 'column' : 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: width < 340 ? 12 : 16,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignItems: 'center',
    alignSelf: 'stretch', // Makes card grow with container
    width: '100%', // Full width dalam container
  },
  scoreCircle: {
    width: width < 340 ? 65 : (width < 380 ? 70 : 80),
    height: width < 340 ? 65 : (width < 380 ? 70 : 80),
    borderRadius: width < 340 ? 32.5 : (width < 380 ? 35 : 40),
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width < 380 ? 0 : 16,
    marginBottom: width < 380 ? 10 : 0,
  },
  scoreNumber: {
    fontSize: width < 340 ? 22 : (width < 380 ? 24 : 28),
    fontWeight: '700',
    color: COLORS.white,
  },
  scoreLabel: {
    fontSize: width < 340 ? 9 : (width < 380 ? 10 : 11),
    color: COLORS.white,
    opacity: 0.9,
  },
  scoreInfo: {
    flex: 1,
    alignItems: width < 380 ? 'center' : 'flex-start',
  },
  scoreTitle: {
    fontSize: width < 340 ? 15 : (width < 380 ? 16 : 18),
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
    textAlign: width < 380 ? 'center' : 'left',
  },
  scoreDesc: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 13),
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: 8,
    textAlign: width < 380 ? 'center' : 'left',
  },
  scoreStats: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreStatText: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: HORIZONTAL_PADDING, // Consistent dengan card calculations
    marginTop: width < 340 ? 18 : (width < 380 ? 20 : 24),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width < 340 ? 10 : 12,
  },
  sectionTitle: {
    fontSize: width < 340 ? 15 : (width < 380 ? 16 : 18),
    fontWeight: '700',
    color: COLORS.gray800,
  },
  seeAll: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 14),
    color: COLORS.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Changed from space-between
    gap: CARD_GAP, // Fixed gap - tidak berubah saat screen lebar
    marginTop: 12,
  },
  actionCard: {
    width: CARD_WIDTH, // Width yang grows, bukan gap
    minHeight: width < 340 ? 85 : (width < 380 ? 95 : 100),
    borderRadius: width < 340 ? 10 : 12,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: width < 340 ? 6 : 8,
    paddingVertical: width < 340 ? 8 : 12,
    paddingHorizontal: width < 340 ? 4 : 8,
  },
  actionText: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 14),
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Changed from space-between
    gap: CARD_GAP, // Fixed gap - tidak berubah saat screen lebar
    marginTop: 12,
  },
  statCard: {
    width: CARD_WIDTH, // Width yang grows, bukan gap
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    minHeight: width < 340 ? 110 : (width < 380 ? 125 : 140),
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: width < 340 ? 18 : (width < 380 ? 20 : 24),
    fontWeight: '700',
    color: COLORS.gray800,
  },
  statLabel: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 14),
    color: COLORS.gray600,
    marginBottom: 4,
  },
  statUnit: {
    fontSize: width < 340 ? 10 : (width < 380 ? 11 : 12),
    color: COLORS.gray500,
    marginBottom: 4,
  },
  statStatus: {
    fontSize: width < 340 ? 10 : (width < 380 ? 11 : 12),
    color: COLORS.green600,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.gray200,
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  statGoal: {
    fontSize: 11,
    color: COLORS.gray500,
  },
  medCard: {
    flexDirection: width < 380 ? 'column' : 'row',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignItems: 'center',
    marginTop: 12,
    gap: width < 380 ? 12 : 0,
    width: '100%', // Full width
    alignSelf: 'stretch',
  },
  medProgress: {
    width: width < 340 ? 48 : (width < 380 ? 54 : 60),
    height: width < 340 ? 48 : (width < 380 ? 54 : 60),
    borderRadius: width < 340 ? 24 : (width < 380 ? 27 : 30),
    backgroundColor: COLORS.gray100,
    marginRight: width < 380 ? 0 : 12,
    overflow: 'hidden',
  },
  medProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  medInfo: {
    flex: 1,
    alignItems: width < 380 ? 'center' : 'flex-start',
  },
  medTitle: {
    fontSize: width < 340 ? 13 : (width < 380 ? 14 : 16),
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
    textAlign: width < 380 ? 'center' : 'left',
  },
  medDesc: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 13),
    color: COLORS.gray600,
    textAlign: width < 380 ? 'center' : 'left',
  },
  activityList: {
    marginTop: 12,
    gap: 12,
    alignSelf: 'stretch', // Stretch to section width
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignItems: 'center',
    alignSelf: 'stretch', // Stretch to activityList width
  },
  activityIcon: {
    width: width < 340 ? 36 : (width < 380 ? 38 : 40),
    height: width < 340 ? 36 : (width < 380 ? 38 : 40),
    borderRadius: width < 340 ? 18 : (width < 380 ? 19 : 20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width < 340 ? 10 : 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: width < 340 ? 12 : (width < 380 ? 13 : 14),
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: width < 340 ? 10 : (width < 380 ? 11 : 12),
    color: COLORS.gray600,
  },
});

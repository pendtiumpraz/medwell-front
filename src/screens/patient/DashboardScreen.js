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
import { vitalsAPI } from '../../api/vitals';
import { wearablesAPI } from '../../api/wearables';
import { medicationsAPI } from '../../api/medications';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    latestVitals: null,
    todayWearable: null,
    todayMedications: [],
    unresolvedAlerts: 0,
    wellnessScore: null,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // TODO: Replace with real API calls when backend is ready
      // Mock data for now
      setDashboardData({
        latestVitals: {
          blood_pressure: { systolic: 120, diastolic: 80 },
          heart_rate: 72,
          blood_glucose: 95,
          temperature: 36.5,
          spo2: 98,
          recorded_at: new Date().toISOString(),
        },
        todayWearable: {
          steps: 6847,
          distance: 5.2,
          calories: 342,
          active_minutes: 45,
          sleep_hours: 7.5,
          wellness_score: 85,
        },
        todayMedications: [
          { id: 1, name: 'Aspirin 100mg', time: '08:00 AM', taken: true },
          { id: 2, name: 'Vitamin D', time: '08:00 AM', taken: true },
          { id: 3, name: 'Blood Pressure Med', time: '08:00 PM', taken: false },
        ],
        unresolvedAlerts: 0,
        wellnessScore: 85,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.profile?.full_name || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={24} color={COLORS.white} />
            {dashboardData.unresolvedAlerts > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{dashboardData.unresolvedAlerts}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Wellness Score Card */}
        {dashboardData.wellnessScore && (
          <LinearGradient
            colors={[COLORS.healthcare, '#00ACC1']}
            style={styles.wellnessCard}
          >
            <View style={styles.wellnessContent}>
              <View>
                <Text style={styles.wellnessLabel}>Today's Wellness Score</Text>
                <Text style={styles.wellnessScore}>
                  {dashboardData.wellnessScore}
                  <Text style={styles.wellnessMax}>/100</Text>
                </Text>
                <Text style={styles.wellnessStatus}>Excellent! Keep it up!</Text>
              </View>
              <View style={styles.wellnessIcon}>
                <Icon name="heart-pulse" size={48} color={COLORS.white} />
              </View>
            </View>
          </LinearGradient>
        )}

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.statsGrid}>
            {/* Steps */}
            <View style={styles.statCard}>
              <Icon name="walk" size={28} color={COLORS.primary} />
              <Text style={styles.statValue}>
                {dashboardData.todayWearable?.steps?.toLocaleString() || '0'}
              </Text>
              <Text style={styles.statLabel}>Steps</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        ((dashboardData.todayWearable?.steps || 0) / 10000) * 100,
                        100
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>

            {/* Heart Rate */}
            <View style={styles.statCard}>
              <Icon name="heart-pulse" size={28} color={COLORS.alert} />
              <Text style={styles.statValue}>
                {dashboardData.todayWearable?.avg_heart_rate || '--'}
              </Text>
              <Text style={styles.statLabel}>Heart Rate</Text>
              <Text style={styles.statUnit}>bpm</Text>
            </View>

            {/* Calories */}
            <View style={styles.statCard}>
              <Icon name="fire" size={28} color={COLORS.energy} />
              <Text style={styles.statValue}>
                {dashboardData.todayWearable?.calories_burned || '0'}
              </Text>
              <Text style={styles.statLabel}>Calories</Text>
              <Text style={styles.statUnit}>kcal</Text>
            </View>

            {/* Sleep */}
            <View style={styles.statCard}>
              <Icon name="sleep" size={28} color={COLORS.healthcare} />
              <Text style={styles.statValue}>
                {Math.round((dashboardData.todayWearable?.sleep_duration || 0) / 60) || '--'}
              </Text>
              <Text style={styles.statLabel}>Sleep</Text>
              <Text style={styles.statUnit}>hours</Text>
            </View>
          </View>
        </View>

        {/* Latest Vitals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Vitals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Vitals')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.vitalsCard}>
            <VitalItem
              icon="heart-pulse"
              label="Blood Pressure"
              value={
                dashboardData.latestVitals?.blood_pressure
                  ? `${dashboardData.latestVitals.blood_pressure.systolic}/${dashboardData.latestVitals.blood_pressure.diastolic}`
                  : '--/--'
              }
              unit="mmHg"
              status="normal"
            />
            <VitalItem
              icon="water"
              label="Blood Glucose"
              value={dashboardData.latestVitals?.glucose?.glucose_value || '--'}
              unit="mg/dL"
              status="normal"
            />
            <VitalItem
              icon="thermometer"
              label="Temperature"
              value={dashboardData.latestVitals?.temperature?.temperature || '--'}
              unit="°C"
              status="normal"
            />
            <VitalItem
              icon="pulse"
              label="SpO2"
              value={dashboardData.latestVitals?.spo2?.spo2_value || '--'}
              unit="%"
              status="normal"
            />
          </View>
        </View>

        {/* Today's Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Medications</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Medications')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {dashboardData.todayMedications.length > 0 ? (
            dashboardData.todayMedications.slice(0, 3).map((med, index) => (
              <MedicationItem key={index} medication={med} />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Icon name="pill" size={48} color={COLORS.gray300} />
              <Text style={styles.emptyText}>No medications for today</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <QuickAction
              icon="heart-pulse"
              label="Log Vitals"
              color={COLORS.primary}
              onPress={() => navigation.navigate('Vitals')}
            />
            <QuickAction
              icon="pill"
              label="Medications"
              color={COLORS.healthcare}
              onPress={() => navigation.navigate('Medications')}
            />
            <QuickAction
              icon="watch"
              label="Sync Device"
              color={COLORS.energy}
              onPress={() => navigation.navigate('Wearables')}
            />
            <QuickAction
              icon="file-document"
              label="Documents"
              color={COLORS.success}
              onPress={() => navigation.navigate('Documents')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Sub-components
function VitalItem({ icon, label, value, unit, status }) {
  const statusColor =
    status === 'normal'
      ? COLORS.success
      : status === 'warning'
      ? COLORS.warning
      : COLORS.alert;

  return (
    <View style={styles.vitalItem}>
      <Icon name={icon} size={24} color={COLORS.primary} />
      <View style={styles.vitalContent}>
        <Text style={styles.vitalLabel}>{label}</Text>
        <View style={styles.vitalValueRow}>
          <Text style={styles.vitalValue}>{value}</Text>
          <Text style={styles.vitalUnit}> {unit}</Text>
        </View>
      </View>
      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
    </View>
  );
}

function MedicationItem({ medication }) {
  return (
    <TouchableOpacity style={styles.medicationCard}>
      <View style={styles.medicationIcon}>
        <Icon name="pill" size={24} color={COLORS.white} />
      </View>
      <View style={styles.medicationContent}>
        <Text style={styles.medicationName}>
          {medication.patientMedication?.medication?.name}
        </Text>
        <Text style={styles.medicationDosage}>
          {medication.patientMedication?.dosage}{' '}
          {medication.patientMedication?.dosage_unit} •{' '}
          {medication.scheduled_time}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkButton}>
        <Icon name="check" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function QuickAction({ icon, label, color, onPress }) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Icon name={icon} size={28} color={COLORS.white} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.alert,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  wellnessCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.healthcare,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  wellnessContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wellnessLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  wellnessScore: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.white,
  },
  wellnessMax: {
    fontSize: 24,
    opacity: 0.7,
  },
  wellnessStatus: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 4,
  },
  wellnessIcon: {
    opacity: 0.3,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.gray800,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
  },
  statUnit: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 2,
  },
  vitalsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  vitalContent: {
    flex: 1,
    marginLeft: 12,
  },
  vitalLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  vitalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  vitalUnit: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationContent: {
    flex: 1,
    marginLeft: 12,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  medicationDosage: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
  },
  checkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray500,
    marginTop: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
    textAlign: 'center',
  },
});

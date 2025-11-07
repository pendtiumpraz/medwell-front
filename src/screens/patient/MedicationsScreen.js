import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { medicationsAPI } from '../../api/medications';

export default function MedicationsScreen() {
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [allMedications, setAllMedications] = useState([]);
  const [adherenceRate, setAdherenceRate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [schedule, meds, adherence] = await Promise.all([
        medicationsAPI.getTodaySchedule(),
        medicationsAPI.getAll({ status: 'active' }),
        medicationsAPI.getAdherenceRate('week'),
      ]);

      setTodaySchedule(schedule.data);
      setAllMedications(meds.data);
      setAdherenceRate(adherence.data.adherence_rate);
    } catch (error) {
      console.error('Error loading medications:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const markAsTaken = async (scheduleId) => {
    try {
      await medicationsAPI.markTaken(scheduleId);
      Alert.alert('Success', 'Medication marked as taken');
      await loadData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update medication');
    }
  };

  const markAsMissed = async (scheduleId) => {
    Alert.alert(
      'Mark as Missed',
      'Are you sure you missed this medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Missed',
          onPress: async () => {
            try {
              await medicationsAPI.markMissed(scheduleId);
              await loadData();
            } catch (error) {
              Alert.alert('Error', 'Failed to update');
            }
          },
        },
      ]
    );
  };

  const handleConsent = async (medicationId, status) => {
    try {
      await medicationsAPI.consent(medicationId, status);
      Alert.alert('Success', `Medication ${status}`);
      await loadData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update consent');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Adherence Score */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.adherenceCard}
        >
          <View style={styles.adherenceContent}>
            <View>
              <Text style={styles.adherenceLabel}>This Week's Adherence</Text>
              <Text style={styles.adherenceScore}>
                {adherenceRate.toFixed(0)}%
              </Text>
              <Text style={styles.adherenceStatus}>
                {adherenceRate >= 90
                  ? 'Excellent!'
                  : adherenceRate >= 70
                  ? 'Good progress'
                  : 'Needs improvement'}
              </Text>
            </View>
            <View style={styles.adherenceCircle}>
              <Icon name="chart-donut" size={64} color={COLORS.white} style={{ opacity: 0.3 }} />
            </View>
          </View>
        </LinearGradient>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Today's Schedule ({todaySchedule.length})
          </Text>

          {todaySchedule.length > 0 ? (
            todaySchedule.map((schedule, index) => (
              <MedicationScheduleCard
                key={index}
                schedule={schedule}
                onTaken={() => markAsTaken(schedule.id)}
                onMissed={() => markAsMissed(schedule.id)}
              />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Icon name="check-circle" size={48} color={COLORS.success} />
              <Text style={styles.emptyText}>All medications taken today!</Text>
            </View>
          )}
        </View>

        {/* Active Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Medications</Text>

          {allMedications
            .filter((med) => med.status === 'active')
            .map((med, index) => (
              <ActiveMedicationCard
                key={index}
                medication={med}
                onConsent={handleConsent}
              />
            ))}
        </View>

        {/* Pending Consent */}
        {allMedications.filter((med) => med.consent_status === 'pending').length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Your Approval</Text>

            {allMedications
              .filter((med) => med.consent_status === 'pending')
              .map((med, index) => (
                <PendingConsentCard
                  key={index}
                  medication={med}
                  onAccept={() => handleConsent(med.id, 'accepted')}
                  onDecline={() => handleConsent(med.id, 'declined')}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function MedicationScheduleCard({ schedule, onTaken, onMissed }) {
  const isPending = schedule.status === 'pending';
  const isTaken = schedule.status === 'taken';

  return (
    <View style={[styles.scheduleCard, isTaken && styles.scheduleCardTaken]}>
      <View style={styles.scheduleTime}>
        <Text style={styles.scheduleTimeText}>{schedule.scheduled_time}</Text>
      </View>

      <View style={styles.scheduleContent}>
        <Text style={[styles.scheduleName, isTaken && styles.textTaken]}>
          {schedule.patientMedication?.medication?.name}
        </Text>
        <Text style={[styles.scheduleDosage, isTaken && styles.textTaken]}>
          {schedule.patientMedication?.dosage} {schedule.patientMedication?.dosage_unit}
        </Text>
        {schedule.patientMedication?.instructions && (
          <Text style={styles.scheduleInstructions}>
            {schedule.patientMedication.instructions}
          </Text>
        )}
      </View>

      {isPending && (
        <View style={styles.scheduleActions}>
          <TouchableOpacity style={styles.takenButton} onPress={onTaken}>
            <Icon name="check" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.missedButton} onPress={onMissed}>
            <Icon name="close" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {isTaken && (
        <View style={styles.takenBadge}>
          <Icon name="check-circle" size={24} color={COLORS.success} />
        </View>
      )}
    </View>
  );
}

function ActiveMedicationCard({ medication }) {
  return (
    <View style={styles.medicationCard}>
      <View style={styles.medicationHeader}>
        <View style={styles.medicationIconCircle}>
          <Icon name="pill" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{medication.medication?.name}</Text>
          <Text style={styles.medicationDosage}>
            {medication.dosage} {medication.dosage_unit} • {medication.frequency}
          </Text>
        </View>
      </View>

      <View style={styles.medicationDetails}>
        <DetailRow icon="clock-outline" text={`${medication.times_per_day}x daily`} />
        <DetailRow icon="calendar" text={`Started: ${new Date(medication.start_date).toLocaleDateString()}`} />
        {medication.prescriber && (
          <DetailRow icon="doctor" text={`Dr. ${medication.prescriber.username}`} />
        )}
      </View>
    </View>
  );
}

function PendingConsentCard({ medication, onAccept, onDecline }) {
  return (
    <View style={styles.pendingCard}>
      <View style={styles.pendingHeader}>
        <Icon name="alert-circle" size={32} color={COLORS.warning} />
        <Text style={styles.pendingTitle}>New Prescription</Text>
      </View>

      <View style={styles.pendingContent}>
        <Text style={styles.pendingMedName}>{medication.medication?.name}</Text>
        <Text style={styles.pendingDosage}>
          {medication.dosage} {medication.dosage_unit} • {medication.frequency}
        </Text>
        {medication.prescriber_notes && (
          <View style={styles.presciberNotes}>
            <Text style={styles.notesLabel}>Prescriber Notes:</Text>
            <Text style={styles.notesText}>{medication.prescriber_notes}</Text>
          </View>
        )}
      </View>

      <View style={styles.pendingActions}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
          <Icon name="check" size={20} color={COLORS.white} />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
          <Icon name="close" size={20} color={COLORS.alert} />
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DetailRow({ icon, text }) {
  return (
    <View style={styles.detailRow}>
      <Icon name={icon} size={16} color={COLORS.gray500} />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  adherenceCard: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  adherenceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adherenceLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  adherenceScore: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 8,
  },
  adherenceStatus: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 4,
  },
  adherenceCircle: {
    opacity: 0.3,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 16,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleCardTaken: {
    opacity: 0.6,
    backgroundColor: COLORS.gray50,
  },
  scheduleTime: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: COLORS.gray200,
  },
  scheduleTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  scheduleContent: {
    flex: 1,
    paddingLeft: 16,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  scheduleDosage: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
  },
  scheduleInstructions: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 8,
    fontStyle: 'italic',
  },
  textTaken: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  scheduleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  takenButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missedButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.alert,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takenBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  medicationIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
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
  medicationDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  pendingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.warning,
    shadowColor: COLORS.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  pendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  pendingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.warning,
  },
  pendingContent: {
    marginBottom: 16,
  },
  pendingMedName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  pendingDosage: {
    fontSize: 16,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  presciberNotes: {
    backgroundColor: COLORS.gray50,
    padding: 12,
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  acceptButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.alert,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  declineButtonText: {
    color: COLORS.alert,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 12,
  },
});

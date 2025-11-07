import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { vitalsAPI } from '../../api/vitals';

export default function VitalsScreen() {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVitalType, setSelectedVitalType] = useState(null);

  useEffect(() => {
    loadVitals();
  }, []);

  const loadVitals = async () => {
    try {
      const response = await vitalsAPI.getLatest();
      setVitals(response.data);
    } catch (error) {
      console.error('Error loading vitals:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLogModal = (type) => {
    setSelectedVitalType(type);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Log Buttons */}
        <View style={styles.quickLogSection}>
          <Text style={styles.sectionTitle}>Log Vital Signs</Text>
          
          <View style={styles.quickLogGrid}>
            <QuickLogButton
              icon="heart-pulse"
              label="Blood Pressure"
              color={COLORS.alert}
              onPress={() => openLogModal('blood_pressure')}
            />
            <QuickLogButton
              icon="water"
              label="Blood Glucose"
              color={COLORS.healthcare}
              onPress={() => openLogModal('glucose')}
            />
            <QuickLogButton
              icon="thermometer"
              label="Temperature"
              color={COLORS.energy}
              onPress={() => openLogModal('temperature')}
            />
            <QuickLogButton
              icon="pulse"
              label="SpO2"
              color={COLORS.primary}
              onPress={() => openLogModal('spo2')}
            />
            <QuickLogButton
              icon="weight"
              label="Weight"
              color={COLORS.success}
              onPress={() => openLogModal('weight')}
            />
          </View>
        </View>

        {/* Latest Readings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Readings</Text>
            <TouchableOpacity>
              <Text style={styles.viewHistoryText}>View History</Text>
            </TouchableOpacity>
          </View>

          {/* Blood Pressure */}
          {vitals.blood_pressure && (
            <VitalCard
              icon="heart-pulse"
              label="Blood Pressure"
              value={`${vitals.blood_pressure.systolic}/${vitals.blood_pressure.diastolic}`}
              unit="mmHg"
              pulse={vitals.blood_pressure.pulse}
              status="normal"
              time={vitals.blood_pressure.recorded_at}
              color={COLORS.alert}
            />
          )}

          {/* Blood Glucose */}
          {vitals.glucose && (
            <VitalCard
              icon="water"
              label="Blood Glucose"
              value={vitals.glucose.glucose_value}
              unit={vitals.glucose.glucose_unit}
              context={vitals.glucose.glucose_context}
              status="normal"
              time={vitals.glucose.recorded_at}
              color={COLORS.healthcare}
            />
          )}

          {/* Temperature */}
          {vitals.temperature && (
            <VitalCard
              icon="thermometer"
              label="Temperature"
              value={vitals.temperature.temperature}
              unit={`°${vitals.temperature.temperature_unit}`}
              location={vitals.temperature.temperature_location}
              status="normal"
              time={vitals.temperature.recorded_at}
              color={COLORS.energy}
            />
          )}

          {/* SpO2 */}
          {vitals.spo2 && (
            <VitalCard
              icon="pulse"
              label="SpO2"
              value={vitals.spo2.spo2_value}
              unit="%"
              pulse={vitals.spo2.pr_bpm}
              status="normal"
              time={vitals.spo2.recorded_at}
              color={COLORS.primary}
            />
          )}

          {/* Weight */}
          {vitals.weight && (
            <VitalCard
              icon="weight"
              label="Weight"
              value={vitals.weight.weight}
              unit="kg"
              bmi={vitals.weight.bmi}
              status="normal"
              time={vitals.weight.recorded_at}
              color={COLORS.success}
            />
          )}
        </View>
      </ScrollView>

      {/* Log Modal */}
      {selectedVitalType && (
        <LogVitalModal
          visible={modalVisible}
          type={selectedVitalType}
          onClose={() => setModalVisible(false)}
          onSubmit={async (data) => {
            try {
              // Submit based on type
              if (selectedVitalType === 'blood_pressure') {
                await vitalsAPI.logBloodPressure(data);
              } else if (selectedVitalType === 'glucose') {
                await vitalsAPI.logGlucose(data);
              } else if (selectedVitalType === 'temperature') {
                await vitalsAPI.logTemperature(data);
              } else if (selectedVitalType === 'spo2') {
                await vitalsAPI.logSpo2(data);
              } else if (selectedVitalType === 'weight') {
                await vitalsAPI.logWeight(data);
              }

              setModalVisible(false);
              loadVitals();
              Alert.alert('Success', 'Vital signs logged successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to log vital signs');
            }
          }}
        />
      )}
    </View>
  );
}

function QuickLogButton({ icon, label, color, onPress }) {
  return (
    <TouchableOpacity style={styles.quickLogButton} onPress={onPress}>
      <LinearGradient
        colors={[color, color + 'CC']}
        style={styles.quickLogGradient}
      >
        <Icon name={icon} size={32} color={COLORS.white} />
        <Text style={styles.quickLogText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function VitalCard({ icon, label, value, unit, status, time, color, pulse, context, location, bmi }) {
  const statusColor =
    status === 'normal' ? COLORS.success : status === 'warning' ? COLORS.warning : COLORS.alert;

  return (
    <View style={styles.vitalCard}>
      <View style={styles.vitalHeader}>
        <View style={[styles.vitalIcon, { backgroundColor: color }]}>
          <Icon name={icon} size={28} color={COLORS.white} />
        </View>
        <View style={styles.vitalInfo}>
          <Text style={styles.vitalLabel}>{label}</Text>
          <Text style={styles.vitalTime}>{new Date(time).toLocaleString()}</Text>
        </View>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
      </View>

      <View style={styles.vitalValueContainer}>
        <Text style={styles.vitalValue}>
          {value} <Text style={styles.vitalUnit}>{unit}</Text>
        </Text>
        {pulse && <Text style={styles.vitalExtra}>Pulse: {pulse} bpm</Text>}
        {context && <Text style={styles.vitalExtra}>Context: {context.replace('_', ' ')}</Text>}
        {location && <Text style={styles.vitalExtra}>Location: {location}</Text>}
        {bmi && <Text style={styles.vitalExtra}>BMI: {bmi}</Text>}
      </View>
    </View>
  );
}

function LogVitalModal({ visible, type, onClose, onSubmit }) {
  // Implementation for each vital type form
  // Will be implemented based on type
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Log {type}</Text>
          {/* Form fields based on type */}
          <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit({})}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  quickLogSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 16,
  },
  quickLogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLogButton: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLogGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  quickLogText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewHistoryText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  vitalCard: {
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
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vitalIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vitalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  vitalTime: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  vitalValueContainer: {
    marginLeft: 60,
  },
  vitalValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.gray800,
  },
  vitalUnit: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.gray600,
  },
  vitalExtra: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 16,
  },
});

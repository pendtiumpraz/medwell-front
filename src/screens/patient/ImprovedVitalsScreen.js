import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

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

export default function ImprovedVitalsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVital, setSelectedVital] = useState(null);
  const [formData, setFormData] = useState({});

  // Mock data for latest vitals
  const latestVitals = {
    bloodPressure: { systolic: 120, diastolic: 80, time: '2h ago', status: 'normal' },
    heartRate: { value: 72, time: '2h ago', status: 'normal' },
    bloodGlucose: { value: 95, time: '4h ago', status: 'normal' },
    temperature: { value: 36.5, time: '12h ago', status: 'normal' },
    spo2: { value: 98, time: '2h ago', status: 'normal' },
    weight: { value: 70.5, time: '1 day ago', status: 'normal' },
  };

  // History mock data
  const vitalHistory = [
    { date: 'Today, 08:00 AM', type: 'Blood Pressure', value: '120/80 mmHg', status: 'normal' },
    { date: 'Today, 08:00 AM', type: 'Heart Rate', value: '72 bpm', status: 'normal' },
    { date: 'Yesterday, 08:15 AM', type: 'Blood Glucose', value: '92 mg/dL', status: 'normal' },
    { date: 'Yesterday, 08:15 AM', type: 'Blood Pressure', value: '118/78 mmHg', status: 'normal' },
  ];

  const vitalTypes = [
    {
      id: 'bloodPressure',
      name: 'Blood Pressure',
      icon: 'water',
      color: '#3498DB',
      unit: 'mmHg',
      fields: ['systolic', 'diastolic'],
    },
    {
      id: 'heartRate',
      name: 'Heart Rate',
      icon: 'heart-pulse',
      color: '#E74C3C',
      unit: 'bpm',
      fields: ['value'],
    },
    {
      id: 'bloodGlucose',
      name: 'Blood Glucose',
      icon: 'water-outline',
      color: '#9B59B6',
      unit: 'mg/dL',
      fields: ['value'],
    },
    {
      id: 'temperature',
      name: 'Temperature',
      icon: 'thermometer',
      color: '#F39C12',
      unit: '°C',
      fields: ['value'],
    },
    {
      id: 'spo2',
      name: 'SpO2',
      icon: 'lungs',
      color: '#1ABC9C',
      unit: '%',
      fields: ['value'],
    },
    {
      id: 'weight',
      name: 'Weight',
      icon: 'scale-bathroom',
      color: '#34495E',
      unit: 'kg',
      fields: ['value'],
    },
  ];

  const openLogModal = (vital) => {
    setSelectedVital(vital);
    setFormData({});
    setModalVisible(true);
  };

  const handleSaveVital = () => {
    // TODO: Call API to save vital
    console.log('Saving vital:', selectedVital.id, formData);
    Alert.alert('Success', `${selectedVital.name} logged successfully!`);
    setModalVisible(false);
    setFormData({});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return COLORS.green600;
      case 'warning': return COLORS.orange500;
      case 'critical': return COLORS.red500;
      default: return COLORS.gray600;
    }
  };

  const renderVitalCard = (vitalId, data) => {
    const vitalType = vitalTypes.find(v => v.id === vitalId);
    if (!vitalType || !data) return null;

    let displayValue = '';
    if (vitalId === 'bloodPressure') {
      displayValue = `${data.systolic}/${data.diastolic}`;
    } else {
      displayValue = data.value;
    }

    return (
      <View key={vitalId} style={styles.vitalCard}>
        <View style={[styles.vitalIcon, { backgroundColor: vitalType.color + '20' }]}>
          <Icon name={vitalType.icon} size={28} color={vitalType.color} />
        </View>
        <Text style={styles.vitalValue}>{displayValue}</Text>
        <Text style={styles.vitalUnit}>{vitalType.unit}</Text>
        <Text style={styles.vitalName}>{vitalType.name}</Text>
        <Text style={styles.vitalTime}>{data.time}</Text>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(data.status) }]} />
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>Vital Signs</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="chart-line" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Latest Readings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Readings</Text>
          <View style={styles.vitalsGrid}>
            {renderVitalCard('bloodPressure', latestVitals.bloodPressure)}
            {renderVitalCard('heartRate', latestVitals.heartRate)}
            {renderVitalCard('bloodGlucose', latestVitals.bloodGlucose)}
            {renderVitalCard('temperature', latestVitals.temperature)}
            {renderVitalCard('spo2', latestVitals.spo2)}
            {renderVitalCard('weight', latestVitals.weight)}
          </View>
        </View>

        {/* Quick Log Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Log New Vital</Text>
          <View style={styles.logButtons}>
            {vitalTypes.map((vital) => (
              <TouchableOpacity
                key={vital.id}
                style={[styles.logButton, { borderColor: vital.color }]}
                onPress={() => openLogModal(vital)}
              >
                <Icon name={vital.icon} size={24} color={vital.color} />
                <Text style={styles.logButtonText}>{vital.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent History</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.historyList}>
            {vitalHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historyType}>{item.type}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyValue}>{item.value}</Text>
                  <View style={[styles.historyStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.historyStatusText, { color: getStatusColor(item.status) }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Log Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log {selectedVital?.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.gray600} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {selectedVital?.fields.map((field) => (
                <View key={field} style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {field === 'systolic' ? 'Systolic' : field === 'diastolic' ? 'Diastolic' : 'Value'}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter ${field}`}
                    keyboardType="numeric"
                    value={formData[field] || ''}
                    onChangeText={(text) => setFormData({ ...formData, [field]: text })}
                  />
                </View>
              ))}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Add any notes..."
                  multiline
                  numberOfLines={3}
                  value={formData.notes || ''}
                  onChangeText={(text) => setFormData({ ...formData, notes: text })}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveVital}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: HORIZONTAL_PADDING,
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
    marginBottom: width < 340 ? 10 : 12,
  },
  seeAll: {
    fontSize: width < 340 ? 11 : (width < 380 ? 12 : 14),
    color: COLORS.primary,
    fontWeight: '600',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Cards grow, gap stays same
    gap: CARD_GAP, // Fixed gap
  },
  vitalCard: {
    width: CARD_WIDTH, // Width grows with screen
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignItems: 'center',
  },
  vitalIcon: {
    width: width < 340 ? 48 : (width < 380 ? 52 : 56),
    height: width < 340 ? 48 : (width < 380 ? 52 : 56),
    borderRadius: width < 340 ? 24 : (width < 380 ? 26 : 28),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width < 340 ? 10 : 12,
  },
  vitalValue: {
    fontSize: width < 340 ? 20 : (width < 380 ? 22 : 24),
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 2,
  },
  vitalUnit: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray500,
    marginBottom: 8,
  },
  vitalName: {
    fontSize: width < 340 ? 12 : (width < 380 ? 13 : 14),
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 4,
  },
  vitalTime: {
    fontSize: width < 340 ? 10 : 11,
    color: COLORS.gray500,
  },
  statusDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  logButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  logButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  historyList: {
    gap: 12,
    alignSelf: 'stretch', // Stretch to section width
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignSelf: 'stretch', // Stretch to historyList width
  },
  historyLeft: {
    flex: 1,
  },
  historyType: {
    fontSize: width < 340 ? 13 : (width < 380 ? 14 : 15),
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray500,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyValue: {
    fontSize: width < 340 ? 13 : (width < 380 ? 14 : 15),
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  historyStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  historyStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.gray800,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.gray100,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});

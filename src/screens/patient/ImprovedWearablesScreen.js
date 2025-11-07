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
const CARD_GAP = width < 340 ? 8 : (width < 380 ? 10 : 12);

// Card width calculation for 2 column grid
const calculateCardWidth = () => {
  const availableWidth = width - (HORIZONTAL_PADDING * 2);
  const cardWidth = (availableWidth - CARD_GAP) / 2;
  const MIN_CARD_WIDTH = 130;
  return Math.max(MIN_CARD_WIDTH, cardWidth);
};

const CARD_WIDTH = calculateCardWidth();

export default function ImprovedWearablesScreen({ navigation }) {
  const [syncing, setSyncing] = useState(false);

  // Mock data
  const devices = [
    {
      id: 'fitbit',
      name: 'Fitbit Charge 5',
      icon: 'run-fast',
      connected: true,
      lastSync: '2 hours ago',
      battery: 85,
      color: '#00B0B9',
    },
    {
      id: 'apple',
      name: 'Apple Watch Series 8',
      icon: 'watch',
      connected: false,
      lastSync: null,
      battery: null,
      color: '#000000',
    },
    {
      id: 'huawei',
      name: 'Huawei Watch GT 3',
      icon: 'watch-variant',
      connected: false,
      lastSync: null,
      battery: null,
      color: '#FF0000',
    },
  ];

  const todayStats = {
    steps: 6847,
    distance: 5.2,
    calories: 342,
    activeMinutes: 45,
    heartRate: 72,
    sleep: 7.5,
  };

  const handleSync = async (deviceId) => {
    setSyncing(true);
    // TODO: Call API
    setTimeout(() => {
      setSyncing(false);
      Alert.alert('Success', 'Device synced successfully!');
    }, 2000);
  };

  const handleConnect = (deviceId) => {
    Alert.alert(
      'Connect Device',
      `Would you like to connect your ${deviceId} device?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => {
            // TODO: Navigate to OAuth flow
            console.log('Connecting:', deviceId);
          },
        },
      ]
    );
  };

  const handleDisconnect = (deviceId) => {
    Alert.alert(
      'Disconnect Device',
      'Are you sure you want to disconnect this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            // TODO: Call API
            console.log('Disconnecting:', deviceId);
          },
        },
      ]
    );
  };

  const renderDevice = (device) => {
    return (
      <View key={device.id} style={styles.deviceCard}>
        <View style={[styles.deviceIcon, { backgroundColor: device.color + '20' }]}>
          <Icon name={device.icon} size={32} color={device.color} />
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
          {device.connected ? (
            <>
              <View style={styles.connectedBadge}>
                <View style={styles.connectedDot} />
                <Text style={styles.connectedText}>Connected</Text>
              </View>
              <Text style={styles.lastSync}>Last synced {device.lastSync}</Text>
              {device.battery && (
                <View style={styles.batteryContainer}>
                  <Icon name="battery-80" size={16} color={COLORS.green600} />
                  <Text style={styles.batteryText}>{device.battery}%</Text>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.notConnected}>Not connected</Text>
          )}
        </View>
        <View style={styles.deviceActions}>
          {device.connected ? (
            <>
              <TouchableOpacity
                style={[styles.deviceButton, styles.syncButton]}
                onPress={() => handleSync(device.id)}
              >
                <Icon name="sync" size={20} color={COLORS.white} />
                <Text style={styles.syncButtonText}>Sync</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deviceButton, styles.disconnectButton]}
                onPress={() => handleDisconnect(device.id)}
              >
                <Text style={styles.disconnectButtonText}>Disconnect</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.deviceButton, styles.connectButton]}
              onPress={() => handleConnect(device.id)}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          )}
        </View>
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
          <Text style={styles.headerTitle}>Wearable Devices</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="information-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Data from Wearables */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Activity Data</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="walk" size={28} color="#FF6B6B" />
              <Text style={styles.statValue}>{todayStats.steps.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="map-marker-distance" size={28} color="#4ECDC4" />
              <Text style={styles.statValue}>{todayStats.distance}</Text>
              <Text style={styles.statLabel}>km</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="fire" size={28} color="#FF9800" />
              <Text style={styles.statValue}>{todayStats.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="run" size={28} color="#9B59B6" />
              <Text style={styles.statValue}>{todayStats.activeMinutes}</Text>
              <Text style={styles.statLabel}>Active min</Text>
            </View>
          </View>
        </View>

        {/* Connected Devices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          <Text style={styles.sectionDesc}>
            Connect your wearable devices to automatically sync your health data
          </Text>
          {devices.map(renderDevice)}
        </View>

        {/* Sync History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Syncs</Text>
          <View style={styles.historyList}>
            <View style={styles.historyItem}>
              <View style={[styles.historyIcon, { backgroundColor: '#00B0B920' }]}>
                <Icon name="sync" size={20} color="#00B0B9" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyTitle}>Fitbit Charge 5</Text>
                <Text style={styles.historyDesc}>Synced 6,847 steps</Text>
                <Text style={styles.historyTime}>2 hours ago</Text>
              </View>
              <Icon name="check-circle" size={24} color={COLORS.green600} />
            </View>

            <View style={styles.historyItem}>
              <View style={[styles.historyIcon, { backgroundColor: '#00B0B920' }]}>
                <Icon name="sync" size={20} color="#00B0B9" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyTitle}>Fitbit Charge 5</Text>
                <Text style={styles.historyDesc}>Synced sleep data (7.5 hours)</Text>
                <Text style={styles.historyTime}>8 hours ago</Text>
              </View>
              <Icon name="check-circle" size={24} color={COLORS.green600} />
            </View>

            <View style={styles.historyItem}>
              <View style={[styles.historyIcon, { backgroundColor: '#00B0B920' }]}>
                <Icon name="sync" size={20} color="#00B0B9" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyTitle}>Fitbit Charge 5</Text>
                <Text style={styles.historyDesc}>Synced heart rate data</Text>
                <Text style={styles.historyTime}>Yesterday</Text>
              </View>
              <Icon name="check-circle" size={24} color={COLORS.green600} />
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
  sectionTitle: {
    fontSize: width < 340 ? 15 : (width < 380 ? 16 : 18),
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: width < 340 ? 12 : (width < 380 ? 13 : 14),
    color: COLORS.gray600,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: CARD_GAP,
  },
  statCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray800,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.gray600,
    marginTop: 4,
  },
  deviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    marginBottom: 12,
    alignSelf: 'stretch', // Stretch full width
  },
  deviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  deviceInfo: {
    marginBottom: 12,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 6,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green600,
  },
  connectedText: {
    fontSize: 14,
    color: COLORS.green600,
    fontWeight: '500',
  },
  lastSync: {
    fontSize: 13,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  batteryText: {
    fontSize: 13,
    color: COLORS.gray600,
  },
  notConnected: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  deviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  deviceButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    gap: 6,
  },
  syncButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
  disconnectButton: {
    backgroundColor: COLORS.gray100,
  },
  disconnectButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  connectButton: {
    backgroundColor: COLORS.primary,
  },
  connectButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
  historyList: {
    gap: 12,
    alignSelf: 'stretch',
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 10 : (width < 380 ? 12 : 16),
    alignItems: 'center',
    alignSelf: 'stretch', // Stretch full width
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  historyDesc: {
    fontSize: 13,
    color: COLORS.gray600,
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    color: COLORS.gray500,
  },
});

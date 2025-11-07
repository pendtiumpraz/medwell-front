import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import COLORS from '../../constants/colors';
import { wearablesAPI } from '../../api/wearables';

export default function WearablesScreen() {
  const [status, setStatus] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const response = await wearablesAPI.getStatus();
      setStatus(response.data);
    } catch (error) {
      console.error('Error loading status:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectFitbit = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const authUrl = `http://localhost:8000/api/v1/wearables/fitbit/connect?redirect_uri=${redirectUri}`;
      
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      
      if (result.type === 'success') {
        Alert.alert('Success', 'Fitbit connected successfully!');
        await loadStatus();
        await syncData();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect Fitbit');
    }
  };

  const connectHuawei = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const authUrl = `http://localhost:8000/api/v1/wearables/huawei/connect?redirect_uri=${redirectUri}`;
      
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      
      if (result.type === 'success') {
        Alert.alert('Success', 'Huawei Health connected successfully!');
        await loadStatus();
        await syncData();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect Huawei');
    }
  };

  const syncData = async () => {
    if (!status?.connected) {
      Alert.alert('Error', 'No wearable device connected');
      return;
    }

    setSyncing(true);
    try {
      let response;
      if (status.wearable_type === 'fitbit') {
        response = await wearablesAPI.syncFitbit();
      } else if (status.wearable_type === 'huawei') {
        response = await wearablesAPI.syncHuawei();
      }

      if (response.success) {
        Alert.alert('Success', 'Data synced successfully!');
        await loadStatus();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sync data');
    } finally {
      setSyncing(false);
    }
  };

  const disconnectDevice = async () => {
    Alert.alert(
      'Disconnect Device',
      'Are you sure you want to disconnect your wearable device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            try {
              await wearablesAPI.disconnect();
              Alert.alert('Success', 'Device disconnected');
              await loadStatus();
            } catch (error) {
              Alert.alert('Error', 'Failed to disconnect');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Connection Status Card */}
      {status?.connected ? (
        <LinearGradient
          colors={[COLORS.success, '#4CAF50']}
          style={styles.statusCard}
        >
          <View style={styles.statusHeader}>
            <Icon name="check-circle" size={48} color={COLORS.white} />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Device Connected</Text>
              <Text style={styles.statusSubtitle}>
                {status.wearable_type === 'fitbit' && 'Fitbit'}
                {status.wearable_type === 'huawei' && 'Huawei Health'}
                {status.wearable_type === 'apple' && 'Apple Watch'}
                {status.wearable_type === 'samsung' && 'Samsung Watch'}
              </Text>
            </View>
          </View>

          {status.last_synced && (
            <Text style={styles.lastSyncText}>
              Last synced: {new Date(status.last_synced).toLocaleString()}
            </Text>
          )}

          <View style={styles.statusActions}>
            <TouchableOpacity
              style={styles.syncButton}
              onPress={syncData}
              disabled={syncing}
            >
              {syncing ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <>
                  <Icon name="sync" size={20} color={COLORS.white} />
                  <Text style={styles.syncButtonText}>Sync Now</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={disconnectDevice}
            >
              <Icon name="link-off" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.statusCard}>
          <Icon name="watch-variant-outline" size={64} color={COLORS.gray300} />
          <Text style={styles.disconnectedTitle}>No Device Connected</Text>
          <Text style={styles.disconnectedText}>
            Connect your wearable device to track your health automatically
          </Text>
        </View>
      )}

      {/* Available Devices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect Your Device</Text>

        {/* Fitbit */}
        <DeviceCard
          icon="watch"
          name="Fitbit"
          description="Track steps, heart rate, sleep & more"
          color="#00B0B9"
          connected={status?.wearable_type === 'fitbit'}
          onConnect={connectFitbit}
          features={['Steps', 'Heart Rate', 'Sleep', 'Calories']}
        />

        {/* Huawei */}
        <DeviceCard
          icon="watch-variant"
          name="Huawei Health"
          description="Sync activity and health data"
          color="#C8291B"
          connected={status?.wearable_type === 'huawei'}
          onConnect={connectHuawei}
          features={['Steps', 'Distance', 'Calories', 'Heart Rate']}
        />

        {/* Apple Watch */}
        <DeviceCard
          icon="apple"
          name="Apple Watch"
          description="Full health tracking with HealthKit"
          color="#000000"
          connected={status?.wearable_type === 'apple'}
          onConnect={() => Alert.alert('Coming Soon', 'Apple Watch integration coming soon')}
          features={['Steps', 'Heart Rate', 'Sleep', 'Workout']}
          comingSoon
        />

        {/* Samsung */}
        <DeviceCard
          icon="watch-variant"
          name="Samsung Galaxy Watch"
          description="Samsung Health integration"
          color="#1428A0"
          connected={status?.wearable_type === 'samsung'}
          onConnect={() => Alert.alert('Coming Soon', 'Samsung Watch integration coming soon')}
          features={['Steps', 'Heart Rate', 'Sleep']}
          comingSoon
        />
      </View>

      {/* Benefits Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Connect a Wearable?</Text>
        
        <View style={styles.benefitsCard}>
          <BenefitItem
            icon="sync"
            title="Automatic Tracking"
            description="No manual logging needed"
          />
          <BenefitItem
            icon="chart-line"
            title="Better Insights"
            description="Detailed health trends & patterns"
          />
          <BenefitItem
            icon="bell-ring"
            title="Real-time Alerts"
            description="Get notified of health concerns"
          />
          <BenefitItem
            icon="target"
            title="Achieve Goals"
            description="Track progress towards your health goals"
          />
        </View>
      </View>
    </ScrollView>
  );
}

function DeviceCard({ icon, name, description, color, connected, onConnect, features, comingSoon }) {
  return (
    <View style={styles.deviceCard}>
      <View style={styles.deviceHeader}>
        <View style={[styles.deviceIcon, { backgroundColor: color }]}>
          <Icon name={icon} size={32} color={COLORS.white} />
        </View>
        <View style={styles.deviceInfo}>
          <View style={styles.deviceNameRow}>
            <Text style={styles.deviceName}>{name}</Text>
            {comingSoon && (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Soon</Text>
              </View>
            )}
          </View>
          <Text style={styles.deviceDescription}>{description}</Text>
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureChip}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Connect Button */}
      {!connected ? (
        <TouchableOpacity
          style={[
            styles.connectButton,
            comingSoon && styles.connectButtonDisabled,
          ]}
          onPress={onConnect}
          disabled={comingSoon}
        >
          <Text style={styles.connectButtonText}>
            {comingSoon ? 'Coming Soon' : 'Connect'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.connectedBadge}>
          <Icon name="check-circle" size={20} color={COLORS.success} />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      )}
    </View>
  );
}

function BenefitItem({ icon, title, description }) {
  return (
    <View style={styles.benefitItem}>
      <View style={styles.benefitIcon}>
        <Icon name={icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCard: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  statusSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  lastSyncText: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: 16,
  },
  statusActions: {
    flexDirection: 'row',
    gap: 12,
  },
  syncButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  syncButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  disconnectButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  disconnectedTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.gray700,
    marginTop: 16,
    textAlign: 'center',
  },
  disconnectedText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  deviceCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  deviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  comingSoonBadge: {
    backgroundColor: COLORS.warning,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.white,
  },
  deviceDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featureChip: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.gray700,
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonDisabled: {
    backgroundColor: COLORS.gray300,
  },
  connectButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  connectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  benefitsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitContent: {
    flex: 1,
    marginLeft: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: COLORS.gray600,
  },
});

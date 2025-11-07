import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function NotificationsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    medicationReminders: true,
    vitalSignAlerts: true,
    appointmentReminders: true,
    healthTips: false,
    deviceSync: true,
    emailNotifications: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationGroups = [
    {
      title: 'Health Reminders',
      items: [
        { key: 'medicationReminders', label: 'Medication Reminders', icon: 'pill', desc: 'Get reminded when it\'s time to take medication' },
        { key: 'vitalSignAlerts', label: 'Vital Sign Alerts', icon: 'heart-pulse', desc: 'Alerts for abnormal vital signs' },
        { key: 'appointmentReminders', label: 'Appointment Reminders', icon: 'calendar-check', desc: 'Reminders for upcoming appointments' },
      ],
    },
    {
      title: 'General',
      items: [
        { key: 'healthTips', label: 'Health Tips', icon: 'lightbulb', desc: 'Daily health tips and wellness advice' },
        { key: 'deviceSync', label: 'Device Sync Notifications', icon: 'sync', desc: 'Notifications when devices sync data' },
      ],
    },
    {
      title: 'Notification Channels',
      items: [
        { key: 'pushNotifications', label: 'Push Notifications', icon: 'bell', desc: 'In-app notifications' },
        { key: 'emailNotifications', label: 'Email Notifications', icon: 'email', desc: 'Send notifications to email' },
        { key: 'smsNotifications', label: 'SMS Notifications', icon: 'message', desc: 'Send notifications via SMS' },
      ],
    },
  ];

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
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notificationGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.settingsList}>
              {group.items.map((item, itemIndex) => (
                <View
                  key={item.key}
                  style={[
                    styles.settingItem,
                    itemIndex === group.items.length - 1 && styles.settingItemLast,
                  ]}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, { backgroundColor: COLORS.primary + '20' }]}>
                      <Icon name={item.icon} size={20} color={COLORS.primary} />
                    </View>
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      <Text style={styles.settingDesc}>{item.desc}</Text>
                    </View>
                  </View>
                  <Switch
                    value={settings[item.key]}
                    onValueChange={() => toggleSetting(item.key)}
                    trackColor={{ false: COLORS.gray300, true: COLORS.primary + '80' }}
                    thumbColor={settings[item.key] ? COLORS.primary : COLORS.gray400}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

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
    fontSize: width < 340 ? 18 : 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
  },
  sectionTitle: {
    fontSize: width < 340 ? 14 : (width < 380 ? 15 : 16),
    fontWeight: '700',
    color: COLORS.gray700,
    marginBottom: 12,
  },
  settingsList: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width < 340 ? 12 : 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray600,
    lineHeight: 16,
  },
});

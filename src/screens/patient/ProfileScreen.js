import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const profile = user?.profile;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={styles.header}
        >
          <TouchableOpacity style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="account" size={48} color={COLORS.white} />
              </View>
            )}
            <View style={styles.editAvatarBadge}>
              <Icon name="camera" size={16} color={COLORS.white} />
            </View>
          </TouchableOpacity>

          <Text style={styles.profileName}>{profile?.full_name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>

          {/* Health Stats Quick View */}
          <View style={styles.quickStatsRow}>
            <QuickStat label="Age" value={profile?.age || '--'} />
            <QuickStat label="Height" value={profile?.height ? `${profile.height} cm` : '--'} />
            <QuickStat label="Weight" value={profile?.weight ? `${profile.weight} kg` : '--'} />
            <QuickStat label="BMI" value={profile?.bmi || '--'} />
          </View>
        </LinearGradient>

        {/* Menu Sections */}
        <View style={styles.content}>
          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <MenuItem
              icon="account-edit"
              label="Edit Profile"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <MenuItem
              icon="shield-lock"
              label="Change Password"
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </View>

          {/* Health Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health Information</Text>
            <MenuItem
              icon="medical-bag"
              label="Medical Conditions"
              onPress={() => navigation.navigate('MedicalConditions')}
            />
            <MenuItem
              icon="alert-circle"
              label="Allergies"
              onPress={() => navigation.navigate('Allergies')}
            />
            <MenuItem
              icon="water"
              label="Blood Type"
              value={profile?.blood_type || 'Not set'}
            />
          </View>

          {/* Connected Devices */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connected Devices</Text>
            <MenuItem
              icon="watch"
              label="Wearable Devices"
              value={profile?.wearable_type !== 'none' ? 'Connected' : 'Not connected'}
              onPress={() => navigation.navigate('Wearables')}
              showChevron
            />
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <MenuItem
              icon="bell"
              label="Notifications"
              onPress={() => navigation.navigate('NotificationSettings')}
            />
            <MenuItem
              icon="translate"
              label="Language"
              value="English"
              onPress={() => navigation.navigate('LanguageSettings')}
            />
            <MenuItem
              icon="theme-light-dark"
              label="Theme"
              value="Light"
              onPress={() => Alert.alert('Coming Soon', 'Dark mode coming soon')}
            />
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <MenuItem
              icon="help-circle"
              label="Help & FAQ"
              onPress={() => navigation.navigate('Help')}
            />
            <MenuItem
              icon="email"
              label="Contact Support"
              onPress={() => navigation.navigate('ContactSupport')}
            />
            <MenuItem
              icon="file-document"
              label="Privacy Policy"
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />
            <MenuItem
              icon="shield-check"
              label="Terms of Service"
              onPress={() => navigation.navigate('Terms')}
            />
          </View>

          {/* App Info */}
          <View style={styles.appInfoSection}>
            <Text style={styles.appInfoText}>Medwell v1.0.0</Text>
            <Text style={styles.appInfoText}>© 2024 Bio Farma</Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color={COLORS.alert} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function QuickStat({ label, value }) {
  return (
    <View style={styles.quickStatItem}>
      <Text style={styles.quickStatValue}>{value}</Text>
      <Text style={styles.quickStatLabel}>{label}</Text>
    </View>
  );
}

function MenuItem({ icon, label, value, onPress, showChevron = true }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.menuIconCircle}>
        <Icon name={icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        {value && <Text style={styles.menuValue}>{value}</Text>}
      </View>
      {showChevron && onPress && (
        <Icon name="chevron-right" size={24} color={COLORS.gray400} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.energy,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 20,
  },
  quickStatsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  quickStatLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.gray800,
    fontWeight: '500',
  },
  menuValue: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 2,
  },
  appInfoSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: COLORS.gray500,
    marginBottom: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.alert,
    gap: 8,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.alert,
  },
});

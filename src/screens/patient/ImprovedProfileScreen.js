import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

// Responsive padding - consistent with other screens
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function ImprovedProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { id: 'edit', icon: 'account-edit', label: 'Edit Profile', color: COLORS.primary },
        { id: 'password', icon: 'lock-reset', label: 'Change Password', color: '#F39C12' },
        { id: 'notifications', icon: 'bell', label: 'Notifications', color: '#E74C3C' },
      ],
    },
    {
      title: 'Health Data',
      items: [
        { id: 'vitals', icon: 'heart-pulse', label: 'My Vitals', color: '#E74C3C' },
        { id: 'medications', icon: 'pill', label: 'My Medications', color: '#4ECDC4' },
        { id: 'wearables', icon: 'watch', label: 'Connected Devices', color: '#9B59B6' },
        { id: 'reports', icon: 'chart-line', label: 'Health Reports', color: '#3498DB' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: 'help-circle', label: 'Help & Support', color: '#1ABC9C' },
        { id: 'about', icon: 'information', label: 'About Medwell', color: '#34495E' },
        { id: 'privacy', icon: 'shield-check', label: 'Privacy Policy', color: '#7F8C8D' },
      ],
    },
  ];

  const renderMenuItem = (item) => {
    const navigationMap = {
      'edit': 'EditProfile',
      'password': 'ChangePassword',
      'notifications': 'Notifications',
      'vitals': 'Vitals',
      'medications': 'Medications',
      'wearables': 'Wearables',
      'reports': 'HealthReports',
      'help': 'HelpSupport',
      'about': 'About',
      'privacy': 'PrivacyPolicy',
    };

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={() => {
          const screenName = navigationMap[item.id];
          if (screenName) {
            navigation.navigate(screenName);
          } else {
            Alert.alert('Coming Soon', `${item.label} feature is coming soon!`);
          }
        }}
      >
        <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
          <Icon name={item.icon} size={24} color={item.color} />
        </View>
        <Text style={styles.menuLabel}>{item.label}</Text>
        <Icon name="chevron-right" size={24} color={COLORS.gray400} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Profile Info */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {(user?.full_name || user?.username || 'U').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user?.full_name || user?.username || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@medwell.id'}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85</Text>
              <Text style={styles.statLabel}>Wellness</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Vitals Logged</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {menuSections.map((section, index) => (
          <View key={index} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuList}>
              {section.items.map(renderMenuItem)}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color={COLORS.red500} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    paddingBottom: width < 340 ? 24 : 30,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  profileSection: {
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
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
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.white,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  content: {
    flex: 1,
  },
  menuSection: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
  },
  sectionTitle: {
    fontSize: width < 340 ? 14 : (width < 380 ? 15 : 16),
    fontWeight: '700',
    color: COLORS.gray700,
    marginBottom: width < 340 ? 10 : 12,
  },
  menuList: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    overflow: 'hidden',
    alignSelf: 'stretch', // Stretch full width
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width < 340 ? 12 : (width < 380 ? 14 : 16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.gray800,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
    padding: width < 340 ? 12 : (width < 380 ? 14 : 16),
    borderRadius: width < 340 ? 10 : 12,
    gap: 8,
    alignSelf: 'stretch', // Stretch full width
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.red500,
  },
  version: {
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
    marginTop: 20,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function AboutScreen({ navigation }) {
  const features = [
    { icon: 'heart-pulse', label: 'Vital Signs Tracking', color: '#E74C3C' },
    { icon: 'pill', label: 'Medication Management', color: '#4ECDC4' },
    { icon: 'watch', label: 'Wearable Integration', color: '#9B59B6' },
    { icon: 'chart-line', label: 'Health Reports', color: '#3498DB' },
  ];

  const team = [
    { role: 'Health Tech', icon: 'hospital-box', color: '#4ECDC4' },
    { role: 'AI Powered', icon: 'brain', color: '#9B59B6' },
    { role: 'Secure Data', icon: 'shield-check', color: '#27AE60' },
    { role: '24/7 Support', icon: 'headset', color: '#F39C12' },
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
          <Text style={styles.headerTitle}>About Medwell</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Logo & Version */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Icon name="heart-pulse" size={48} color={COLORS.white} />
          </View>
          <Text style={styles.appName}>MEDWELL</Text>
          <Text style={styles.tagline}>Your Healthy Lifestyle Assistant</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>
              Medwell is a comprehensive health management platform designed to help you track, manage, and improve your health. 
              {'\n\n'}
              With seamless integration of wearable devices, medication reminders, and vital signs tracking, we make healthcare management simple and accessible.
              {'\n\n'}
              Our mission is to empower individuals to take control of their health through technology.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Icon name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureLabel}>{feature.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.teamGrid}>
            {team.map((item, index) => (
              <View key={index} style={styles.teamCard}>
                <View style={[styles.teamIcon, { backgroundColor: item.color + '20' }]}>
                  <Icon name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={styles.teamRole}>{item.role}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact & Social */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://medwell.id')}>
              <Icon name="web" size={20} color={COLORS.primary} />
              <Text style={styles.socialText}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('mailto:info@medwell.id')}>
              <Icon name="email" size={20} color={COLORS.primary} />
              <Text style={styles.socialText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={20} color={COLORS.primary} />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="instagram" size={20} color={COLORS.primary} />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2025 Medwell. All rights reserved.</Text>
          <Text style={styles.madeWith}>Made with ❤️ for your health</Text>
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
    fontSize: width < 340 ? 18 : 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: width < 340 ? 24 : 32,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: width < 340 ? 24 : 28,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  tagline: {
    fontSize: width < 340 ? 13 : 14,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  versionBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  versionText: {
    fontSize: width < 340 ? 11 : 12,
    fontWeight: '600',
    color: COLORS.primary,
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
  },
  aboutText: {
    fontSize: width < 340 ? 12 : 13,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - (HORIZONTAL_PADDING * 2) - 12) / 2,
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureLabel: {
    fontSize: width < 340 ? 11 : 12,
    fontWeight: '600',
    color: COLORS.gray800,
    textAlign: 'center',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  teamCard: {
    width: (width - (HORIZONTAL_PADDING * 2) - 12) / 2,
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
    alignItems: 'center',
  },
  teamIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  teamRole: {
    fontSize: width < 340 ? 12 : 13,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  socialText: {
    fontSize: width < 340 ? 12 : 13,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  footer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 24 : 32,
    alignItems: 'center',
  },
  copyright: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  madeWith: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray500,
  },
});

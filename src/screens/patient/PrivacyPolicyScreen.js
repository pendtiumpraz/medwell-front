import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function PrivacyPolicyScreen({ navigation }) {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, including:\n\n• Personal information (name, email, phone number)\n• Health data (vital signs, medications, activity data)\n• Device data from connected wearables\n• Usage data and analytics',
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use your information to:\n\n• Provide and improve our services\n• Send medication reminders and health alerts\n• Generate personalized health reports\n• Sync data from wearable devices\n• Communicate with you about your health',
    },
    {
      title: '3. Data Security',
      content: 'We implement industry-standard security measures:\n\n• End-to-end encryption for health data\n• Secure cloud storage with regular backups\n• Two-factor authentication support\n• Regular security audits and updates\n• HIPAA compliance standards',
    },
    {
      title: '4. Data Sharing',
      content: 'We do not sell your personal health data. We may share data:\n\n• With your explicit consent\n• With healthcare providers you authorize\n• When required by law\n• With service providers under strict contracts',
    },
    {
      title: '5. Your Rights',
      content: 'You have the right to:\n\n• Access your data at any time\n• Request data correction or deletion\n• Export your health data\n• Opt-out of data collection\n• Revoke third-party access',
    },
    {
      title: '6. Data Retention',
      content: 'We retain your data:\n\n• As long as your account is active\n• For 30 days after account deletion (recovery period)\n• Longer if required by law\n• You can request immediate deletion',
    },
    {
      title: '7. Third-Party Services',
      content: 'We integrate with:\n\n• Wearable device platforms (Fitbit, Apple Health, Huawei)\n• Cloud storage providers\n• Analytics services\n• Communication platforms\n\nEach has their own privacy policies.',
    },
    {
      title: '8. Children\'s Privacy',
      content: 'Our service is not intended for children under 13. We do not knowingly collect data from children. If we discover such data, we will delete it immediately.',
    },
    {
      title: '9. Changes to This Policy',
      content: 'We may update this policy periodically. We will notify you of significant changes via:\n\n• Email notification\n• In-app notification\n• Prominent notice on our website',
    },
    {
      title: '10. Contact Us',
      content: 'For privacy-related questions:\n\n• Email: privacy@medwell.id\n• Phone: +1 (555) 123-4567\n• Address: 123 Health St, Medical City\n\nLast updated: November 2025',
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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.introCard}>
          <Icon name="shield-check" size={32} color={COLORS.green600} />
          <View style={styles.introContent}>
            <Text style={styles.introTitle}>Your Privacy Matters</Text>
            <Text style={styles.introText}>
              At Medwell, we are committed to protecting your privacy and securing your health data. This policy explains how we collect, use, and safeguard your information.
            </Text>
          </View>
        </View>

        {/* Policy Sections */}
        <View style={styles.section}>
          {sections.map((section, index) => (
            <View key={index} style={styles.policyCard}>
              <Text style={styles.policyTitle}>{section.title}</Text>
              <Text style={styles.policyContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        {/* Agreement */}
        <View style={styles.agreementCard}>
          <Icon name="information" size={24} color={COLORS.blue600} />
          <View style={styles.agreementContent}>
            <Text style={styles.agreementTitle}>Your Consent</Text>
            <Text style={styles.agreementText}>
              By using Medwell, you agree to this Privacy Policy. If you do not agree, please discontinue use of our services.
            </Text>
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
    fontSize: width < 340 ? 18 : 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  introCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.green50,
    marginHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
    padding: width < 340 ? 12 : 16,
    borderRadius: width < 340 ? 10 : 12,
    gap: 12,
  },
  introContent: {
    flex: 1,
  },
  introTitle: {
    fontSize: width < 340 ? 14 : 15,
    fontWeight: '700',
    color: COLORS.green700,
    marginBottom: 6,
  },
  introText: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.green700,
    lineHeight: 18,
  },
  section: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
  },
  policyCard: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
    marginBottom: 12,
    alignSelf: 'stretch',
  },
  policyTitle: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 10,
  },
  policyContent: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  agreementCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.blue50,
    marginHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
    padding: width < 340 ? 12 : 16,
    borderRadius: width < 340 ? 10 : 12,
    gap: 12,
  },
  agreementContent: {
    flex: 1,
  },
  agreementTitle: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.blue700,
    marginBottom: 6,
  },
  agreementText: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.blue600,
    lineHeight: 18,
  },
});

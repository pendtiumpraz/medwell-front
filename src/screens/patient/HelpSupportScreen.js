import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function HelpSupportScreen({ navigation }) {
  const faqs = [
    {
      question: 'How do I log my vitals?',
      answer: 'Go to Vitals screen and tap on "Log New Vital" button. Select the vital type and enter your readings.',
    },
    {
      question: 'How do I sync my wearable device?',
      answer: 'Go to Wearables screen and tap "Connect" on your device. Follow the authorization process.',
    },
    {
      question: 'Can I export my health data?',
      answer: 'Yes! Go to Health Reports and tap "Download" on any report to export your data as PDF.',
    },
    {
      question: 'How do I set medication reminders?',
      answer: 'Go to Medications screen, tap on a medication, and set reminder time and frequency.',
    },
  ];

  const contactMethods = [
    { icon: 'phone', label: 'Call Us', value: '+1 (555) 123-4567', action: () => Linking.openURL('tel:+15551234567') },
    { icon: 'email', label: 'Email Us', value: 'support@medwell.id', action: () => Linking.openURL('mailto:support@medwell.id') },
    { icon: 'chat', label: 'Live Chat', value: 'Available 24/7', action: () => {} },
    { icon: 'web', label: 'Website', value: 'www.medwell.id', action: () => Linking.openURL('https://medwell.id') },
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
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactGrid}>
            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={method.action}
              >
                <View style={[styles.contactIcon, { backgroundColor: COLORS.primary + '20' }]}>
                  <Icon name={method.icon} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.contactLabel}>{method.label}</Text>
                <Text style={styles.contactValue}>{method.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqCard}>
              <View style={styles.faqQuestion}>
                <Icon name="help-circle" size={20} color={COLORS.primary} />
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
              </View>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.linksList}>
            <TouchableOpacity style={styles.linkItem}>
              <Icon name="book-open" size={20} color={COLORS.primary} />
              <Text style={styles.linkText}>User Guide</Text>
              <Icon name="chevron-right" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem}>
              <Icon name="video" size={20} color={COLORS.primary} />
              <Text style={styles.linkText}>Video Tutorials</Text>
              <Icon name="chevron-right" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('https://medwell.id/community')}>
              <Icon name="account-group" size={20} color={COLORS.primary} />
              <Text style={styles.linkText}>Community Forum</Text>
              <Icon name="chevron-right" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
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
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
    width: (width - (HORIZONTAL_PADDING * 2) - 12) / 2,
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
    alignItems: 'center',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: width < 340 ? 12 : 13,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: width < 340 ? 10 : 11,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
    marginBottom: 12,
    alignSelf: 'stretch',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  faqAnswer: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray600,
    lineHeight: 18,
    paddingLeft: 28,
  },
  linksList: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    overflow: 'hidden',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width < 340 ? 12 : 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  linkText: {
    flex: 1,
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '500',
    color: COLORS.gray800,
    marginLeft: 12,
  },
});

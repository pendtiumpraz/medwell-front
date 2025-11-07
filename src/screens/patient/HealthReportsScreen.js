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

export default function HealthReportsScreen({ navigation }) {
  const reports = [
    {
      id: 1,
      title: 'Monthly Health Summary',
      date: 'November 2025',
      type: 'Summary',
      icon: 'file-document',
      color: '#4ECDC4',
    },
    {
      id: 2,
      title: 'Blood Pressure Report',
      date: 'Oct 15 - Nov 15, 2025',
      type: 'Vitals',
      icon: 'chart-line',
      color: '#3498DB',
    },
    {
      id: 3,
      title: 'Medication Adherence',
      date: 'October 2025',
      type: 'Medication',
      icon: 'pill',
      color: '#9B59B6',
    },
    {
      id: 4,
      title: 'Activity Report',
      date: 'Oct 1 - Oct 31, 2025',
      type: 'Activity',
      icon: 'run',
      color: '#FF6B6B',
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
          <Text style={styles.headerTitle}>Health Reports</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="download" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Icon name="information" size={24} color={COLORS.blue600} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>About Health Reports</Text>
            <Text style={styles.infoText}>View and download comprehensive health reports including vitals, medications, and activity data.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Reports</Text>
          {reports.map((report, index) => (
            <TouchableOpacity
              key={report.id}
              style={[styles.reportCard, index === 0 && styles.reportCardFirst]}
            >
              <View style={[styles.reportIcon, { backgroundColor: report.color + '20' }]}>
                <Icon name={report.icon} size={24} color={report.color} />
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
                <View style={styles.reportMeta}>
                  <View style={[styles.reportTypeBadge, { backgroundColor: report.color + '20' }]}>
                    <Text style={[styles.reportTypeText, { color: report.color }]}>{report.type}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Icon name="download" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.generateButton}>
            <Icon name="file-plus" size={20} color={COLORS.white} />
            <Text style={styles.generateButtonText}>Generate Custom Report</Text>
          </TouchableOpacity>
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.blue50,
    marginHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
    padding: width < 340 ? 12 : 16,
    borderRadius: width < 340 ? 10 : 12,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.blue700,
    marginBottom: 4,
  },
  infoText: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.blue600,
    lineHeight: 16,
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
  reportCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    padding: width < 340 ? 12 : 16,
    marginBottom: 12,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  reportCardFirst: {
    marginTop: 0,
  },
  reportIcon: {
    width: width < 340 ? 48 : 56,
    height: width < 340 ? 48 : 56,
    borderRadius: width < 340 ? 24 : 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  reportDate: {
    fontSize: width < 340 ? 11 : 12,
    color: COLORS.gray600,
    marginBottom: 6,
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reportTypeText: {
    fontSize: width < 340 ? 10 : 11,
    fontWeight: '600',
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: width < 340 ? 10 : 12,
    paddingVertical: width < 340 ? 12 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  generateButtonText: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});

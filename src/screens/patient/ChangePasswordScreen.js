import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = width < 340 ? 14 : (width < 380 ? 16 : 20);

export default function ChangePasswordScreen({ navigation }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // TODO: Call API to change password
    Alert.alert('Success', 'Password changed successfully!');
    navigation.goBack();
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
          <Text style={styles.headerTitle}>Change Password</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Icon name="information" size={24} color={COLORS.blue600} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Password Requirements</Text>
            <Text style={styles.infoText}>• Minimum 6 characters{'\n'}• Mix of letters and numbers recommended{'\n'}• Avoid common passwords</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChangeText={(text) => setFormData({ ...formData, currentPassword: text })}
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Icon name={showCurrentPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.gray500} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Icon name={showNewPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.gray500} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.gray500} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
            <Text style={styles.saveButtonText}>Change Password</Text>
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
    lineHeight: 18,
  },
  section: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 18 : 24,
  },
  inputGroup: {
    marginBottom: width < 340 ? 16 : 20,
  },
  label: {
    fontSize: width < 340 ? 13 : 14,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 8,
  },
  passwordInput: {
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: width < 340 ? 10 : 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: width < 340 ? 12 : 16,
    paddingVertical: width < 340 ? 10 : 12,
    paddingRight: 50,
    fontSize: width < 340 ? 14 : 16,
    color: COLORS.gray800,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  buttonSection: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: width < 340 ? 16 : 24,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: width < 340 ? 10 : 12,
    paddingVertical: width < 340 ? 12 : 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: width < 340 ? 14 : 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});

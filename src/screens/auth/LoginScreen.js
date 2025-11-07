import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleFitbitLogin = () => {
    // Coming soon - Fitbit OAuth integration
    Alert.alert(
      'Fitbit Login',
      'Fitbit integration coming soon!\n\nThis will connect to your Fitbit account and sync your health data.',
      [{ text: 'OK' }]
    );
  };

  const handleAppleLogin = () => {
    // Coming soon - Apple Watch HealthKit integration
    Alert.alert(
      'Apple Watch Login',
      'Apple HealthKit integration coming soon!\n\nThis will sync data from your Apple Watch and Health app.',
      [{ text: 'OK' }]
    );
  };

  const handleHuaweiLogin = () => {
    // Coming soon - Huawei Health OAuth
    Alert.alert(
      'Huawei Health Login',
      'Huawei Health integration coming soon!\n\nThis will connect to Huawei Health and sync your activity data.',
      [{ text: 'OK' }]
    );
  };

  const handleEmailLogin = () => {
    // Navigate to email login screen
    navigation.navigate('EmailLogin');
  };

  return (
    <LinearGradient
      colors={[COLORS.gray50, COLORS.white]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Icon name="heart-pulse" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.logoText}>MEDWELL</Text>
          <Text style={styles.tagline}>Your Healthy Lifestyle</Text>
          <Text style={styles.tagline}>Assistant</Text>
        </View>

        {/* Primary CTA - Fitbit */}
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.buttonDisabled]}
          onPress={handleFitbitLogin}
          disabled={loading}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.buttonGradient}
          >
            <Icon name="watch" size={24} color={COLORS.white} />
            <Text style={styles.primaryButtonText}>Continue with Fitbit</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.description}>
          You will be redirected to Fitbit{'\n'}
          login page to authenticate
        </Text>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Secondary CTAs */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleAppleLogin}
        >
          <Icon name="apple" size={24} color={COLORS.gray700} />
          <Text style={styles.secondaryButtonText}>Continue with Apple Watch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleHuaweiLogin}
        >
          <Icon name="watch-variant" size={24} color={COLORS.gray700} />
          <Text style={styles.secondaryButtonText}>Continue with Huawei</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleEmailLogin}
        >
          <Icon name="email-outline" size={24} color={COLORS.gray700} />
          <Text style={styles.secondaryButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* Legal Text */}
        <Text style={styles.legalText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms & Conditions</Text>
          {'\n'}and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>

        {/* Register Link */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '300',
    color: COLORS.gray600,
    textAlign: 'center',
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  description: {
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    marginBottom: 12,
    gap: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  legalText: {
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  registerText: {
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 24,
  },
  registerLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

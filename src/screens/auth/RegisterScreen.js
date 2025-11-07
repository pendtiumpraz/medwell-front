import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

export default function RegisterScreen({ navigation }) {
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
          <Text style={styles.subtitle}>Create Account</Text>
        </View>

        {/* Coming Soon Message */}
        <View style={styles.messageBox}>
          <Icon name="information-outline" size={48} color={COLORS.primary} />
          <Text style={styles.messageTitle}>Registration Coming Soon</Text>
          <Text style={styles.messageText}>
            Account registration will be available soon.{'\n'}
            Please contact your healthcare provider for access.
          </Text>
        </View>

        {/* Back to Login Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.buttonGradient}
          >
            <Icon name="arrow-left" size={24} color={COLORS.white} />
            <Text style={styles.buttonText}>Back to Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Help Text */}
        <Text style={styles.helpText}>
          Need help? Contact your healthcare provider{'\n'}
          or email: support@medwell.id
        </Text>
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
    justifyContent: 'center',
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
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: COLORS.gray600,
  },
  messageBox: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.gray800,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
  backButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
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
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 18,
  },
});

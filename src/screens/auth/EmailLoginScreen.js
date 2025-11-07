import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../api/auth';

export default function EmailLoginScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter your username or email');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setLoading(true);

    try {
      // Call backend API
      console.log('Attempting login for:', username);
      const response = await authAPI.login(username.trim(), password);
      console.log('Login response:', response);
      
      if (response.success) {
        console.log('Login successful, storing data...');
        // Store token and user data
        await login({
          token: response.data.token,
          user: response.data.user,
          profile: response.data.profile,
        });
        console.log('Login context updated, should navigate now');
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Failed to login. Please try again.';
      
      if (error.response) {
        // Backend returned error response
        errorMessage = error.response.data?.message || 'Invalid username or password';
      } else if (error.request) {
        // Network error - backend not reachable
        errorMessage = 'Cannot connect to server. Please check:\n\n1. Backend is running at http://localhost:8000\n2. Run: php artisan serve\n3. For Android emulator, use IP: 10.0.2.2:8000';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={[COLORS.gray50, COLORS.white]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color={COLORS.gray700} />
            </TouchableOpacity>
          </View>

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Icon name="heart-pulse" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.logoText}>MEDWELL</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          {/* Backend Connection Info */}
          <View style={styles.demoBox}>
            <Icon name="server-network" size={20} color={COLORS.blue600} />
            <View style={styles.demoText}>
              <Text style={styles.demoTitle}>Connected to Backend:</Text>
              <Text style={styles.demoCredentials}>API: http://localhost:8000/api/v1</Text>
              <Text style={styles.demoInfo}>Use your backend account credentials</Text>
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username or Email</Text>
              <View style={styles.inputWrapper}>
                <Icon name="account-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter username or email"
                  placeholderTextColor={COLORS.gray400}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor={COLORS.gray400}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={COLORS.gray500}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.loginButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <Icon name="login" size={20} color={COLORS.white} />
                    <Text style={styles.loginButtonText}>Sign In</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Back to Main Login */}
            <TouchableOpacity
              style={styles.backToMainButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left-circle-outline" size={20} color={COLORS.gray700} />
              <Text style={styles.backToMainText}>Back to Login Options</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  demoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.blue50,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue500,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  demoText: {
    flex: 1,
    marginLeft: 12,
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.blue700,
    marginBottom: 4,
  },
  demoCredentials: {
    fontSize: 11,
    color: COLORS.blue600,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  demoInfo: {
    fontSize: 12,
    color: COLORS.blue700,
    marginTop: 4,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: COLORS.gray800,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
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
    fontSize: 13,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  backToMainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    gap: 8,
  },
  backToMainText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  registerText: {
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 16,
  },
  registerLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

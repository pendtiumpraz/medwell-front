import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';
import COLORS from '../constants/colors';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import EmailLoginScreen from '../screens/auth/EmailLoginScreen';

// Main Screens
import DashboardScreen from '../screens/patient/ImprovedDashboardScreen';
import VitalsScreen from '../screens/patient/ImprovedVitalsScreen';
import MedicationsScreen from '../screens/patient/ImprovedMedicationsScreen';
import WearablesScreen from '../screens/patient/ImprovedWearablesScreen';
import ProfileScreen from '../screens/patient/ImprovedProfileScreen';

// Profile Menu Screens
import EditProfileScreen from '../screens/patient/EditProfileScreen';
import ChangePasswordScreen from '../screens/patient/ChangePasswordScreen';
import NotificationsScreen from '../screens/patient/NotificationsScreen';
import HealthReportsScreen from '../screens/patient/HealthReportsScreen';
import HelpSupportScreen from '../screens/patient/HelpSupportScreen';
import AboutScreen from '../screens/patient/AboutScreen';
import PrivacyPolicyScreen from '../screens/patient/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for authenticated users
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Vitals') {
            iconName = focused ? 'heart-pulse' : 'heart-pulse';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'pill' : 'pill';
          } else if (route.name === 'Wearables') {
            iconName = focused ? 'watch' : 'watch';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.gray200,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Vitals" 
        component={VitalsScreen}
        options={{ title: 'Vital Signs' }}
      />
      <Tab.Screen 
        name="Medications" 
        component={MedicationsScreen}
        options={{ title: 'Medications' }}
      />
      <Tab.Screen 
        name="Wearables" 
        component={WearablesScreen}
        options={{ title: 'Wearables' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  console.log('AppNavigator render:', { isAuthenticated, loading });

  if (loading) {
    // Show loading screen while checking auth
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Main App Stack with nested screens
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          {/* Profile Menu Screens */}
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="HealthReports" component={HealthReportsScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

# 📱 MEDWELL - BUILD APK GUIDE

## 🚀 CARA 1: EAS BUILD (Recommended)

### Prerequisites:
- ✅ Akun Expo (gratis): https://expo.dev
- ✅ Node.js installed
- ✅ Internet connection

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login ke Expo
```bash
cd D:\AI\medwell\mobile
eas login
```

### Step 3: Configure Project
```bash
eas build:configure
```

### Step 4: Build APK
```bash
# Build APK untuk testing (no Google Play)
eas build -p android --profile preview

# Atau build AAB untuk production (Google Play)
eas build -p android --profile production
```

### Step 5: Download APK
- ✅ Build akan jalan di cloud Expo
- ✅ Tunggu ~10-15 menit
- ✅ Download link akan muncul di terminal
- ✅ Atau cek di: https://expo.dev/accounts/[your-username]/projects/medwell/builds

---

## 🔧 CARA 2: LOCAL BUILD (Manual)

### Prerequisites:
- ✅ Android Studio installed
- ✅ Java JDK 11 atau 17
- ✅ Android SDK & Build Tools

### Step 1: Eject dari Expo (WARNING: Can't go back!)
```bash
cd D:\AI\medwell\mobile
npx expo prebuild
```

### Step 2: Generate APK
```bash
# Debug APK (for testing)
cd android
./gradlew assembleDebug

# Release APK (for production)
./gradlew assembleRelease
```

### Step 3: Find APK
```
Debug APK:
android/app/build/outputs/apk/debug/app-debug.apk

Release APK:
android/app/build/outputs/apk/release/app-release.apk
```

---

## ⚡ CARA 3: EXPO GO (Tanpa Build - FASTEST!)

Untuk testing cepat tanpa build APK:

### Step 1: Install Expo Go di Android
- Download dari Play Store: https://play.google.com/store/apps/details?id=host.exp.exponent

### Step 2: Start Dev Server
```bash
cd D:\AI\medwell\mobile
npx expo start
```

### Step 3: Scan QR Code
- Buka Expo Go app
- Scan QR code dari terminal
- App langsung jalan di HP!

**⚠️ NOTE:** Harus satu WiFi antara laptop & HP!

---

## 📦 PRODUCTION BUILD CHECKLIST

Sebelum build production APK:

### 1. Update app.json
```json
{
  "expo": {
    "name": "Medwell",
    "slug": "medwell",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#863588"
    },
    "android": {
      "package": "com.biofarma.medwell",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#863588"
      }
    }
  }
}
```

### 2. Update API URL di mobile/src/api/client.js
```javascript
// DEVELOPMENT
const API_URL = 'http://localhost:8000/api/v1';

// PRODUCTION (ganti dengan server IP/domain!)
const API_URL = 'https://api.medwell.id/api/v1';
```

### 3. Generate Icon & Splash Screen
- Icon: 1024x1024px PNG
- Splash: 1242x2436px PNG
- Letakkan di `mobile/assets/`

### 4. Setup Signing Key (untuk Release)

#### Generate Keystore:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore medwell-release.keystore -alias medwell -keyalg RSA -keysize 2048 -validity 10000
```

#### Update eas.json:
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk",
        "credentialsSource": "local"
      }
    }
  }
}
```

---

## 🎯 RECOMMENDED WORKFLOW

### For Testing (Internal):
```bash
# Quick test - Expo Go
npx expo start

# Install on device - APK
eas build -p android --profile preview
```

### For Production (Play Store):
```bash
# AAB format required by Google Play
eas build -p android --profile production
```

---

## 🐛 TROUBLESHOOTING

### Error: "Network request failed"
**Fix:** Update API_URL di `mobile/src/api/client.js`
```javascript
// Ganti localhost dengan IP laptop
const API_URL = 'http://192.168.1.100:8000/api/v1';
```

### Error: "JAVA_HOME not set"
**Fix:** Install Java JDK dan set environment variable
```bash
# Windows
setx JAVA_HOME "C:\Program Files\Java\jdk-17"
```

### Error: "SDK location not found"
**Fix:** Create `android/local.properties`
```
sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk
```

### Error: "Duplicate resources"
**Fix:** Run clean build
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## 📊 BUILD SIZE OPTIMIZATION

### 1. Enable ProGuard (Shrink Code)
Edit `android/app/build.gradle`:
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 2. Enable App Bundle
```bash
# AAB is smaller than APK
eas build -p android --profile production
```

### 3. Remove Unused Dependencies
```bash
npm prune --production
```

---

## 🎉 DONE!

**APK Size Expected:** ~30-50 MB (debug) / ~15-25 MB (release)

**Install APK:**
1. Transfer APK ke HP via USB/Email/Drive
2. Enable "Install from Unknown Sources"
3. Tap APK → Install
4. Done! 🎉

# 📦 BUILD APK - STEP BY STEP GUIDE

## ✅ PREREQUISITES READY:

- ✅ `eas.json` - Already configured
- ✅ `app.json` - App metadata ready
- ✅ `package.json` - Dependencies installed
- ✅ Source code - Complete

**Package:** com.biofarma.medwell  
**Version:** 1.0.0  
**Name:** Medwell

---

## 🚀 QUICK BUILD (5 STEPS):

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```
**Time:** ~1 minute

---

### Step 2: Login to Expo
```bash
eas login
```

**If no account:**
```bash
# Option A: Register via CLI
eas register

# Option B: Create at website
# Visit: https://expo.dev/signup
# Then: eas login
```

**Login with:**
- Email
- Password

---

### Step 3: Configure Project (Optional - Already Done!)
```bash
cd D:\AI\medwell\mobile
eas build:configure
```

**Output:**
```
✅ eas.json already exists
✅ Configuration ready
```

---

### Step 4: Build APK
```bash
cd D:\AI\medwell\mobile
eas build -p android --profile preview
```

**What happens:**
1. ✅ Checks configuration
2. ✅ Asks if you want to create new build
3. ✅ Uploads code to Expo servers (~30 seconds)
4. ✅ Builds APK in cloud (~10-20 minutes)
5. ✅ Gives you download link

**Expected output:**
```
✔ Build project configuration
✔ Uploading project to Expo servers
✔ Build started
✔ Build in progress...
✔ Build completed!

Download: https://expo.dev/artifacts/eas/xxxxx.apk
```

---

### Step 5: Download APK
```bash
# Click the download link
# Or visit: https://expo.dev/accounts/[your-username]/projects/medwell-mobile/builds
```

**APK will be:**
- Size: ~50-80 MB
- Name: `build-xxxxx.apk`
- Ready to install on Android device

---

## 📱 INSTALL APK ON DEVICE:

### Method 1: Direct Transfer
```bash
# 1. Copy APK to phone via USB
# 2. Open APK file on phone
# 3. Allow "Install from Unknown Sources"
# 4. Install
# 5. Open Medwell app
```

### Method 2: Share Link
```bash
# Send download link via:
- WhatsApp
- Email
- Telegram

# Recipient downloads & installs
```

---

## 🎯 BUILD PROFILES EXPLAINED:

### Profile: `preview` (For Testing)
```bash
eas build -p android --profile preview
```

**Config:**
```json
{
  "preview": {
    "distribution": "internal",
    "android": {
      "buildType": "apk"    // ← APK file
    },
    "env": {
      "API_URL": "http://192.168.1.100:8000/api/v1"
    }
  }
}
```

**Use for:**
- ✅ Testing on devices
- ✅ Internal distribution
- ✅ Demo purposes
- ✅ Development builds

**Output:** APK file (can install directly)

---

### Profile: `production` (For Google Play)
```bash
eas build -p android --profile production
```

**Config:**
```json
{
  "production": {
    "android": {
      "buildType": "aab"    // ← AAB file
    },
    "env": {
      "API_URL": "https://api.medwell.id/api/v1"
    }
  }
}
```

**Use for:**
- ✅ Google Play Store submission
- ✅ Production release
- ✅ Public distribution

**Output:** AAB file (for Play Store only)

---

## ⚙️ CUSTOMIZE BUILD:

### Change API URL:
Edit `eas.json`:
```json
{
  "preview": {
    "env": {
      "API_URL": "http://YOUR_IP:8000/api/v1"
    }
  }
}
```

Replace `YOUR_IP` with:
- Your computer IP (for local backend)
- Server IP (for remote backend)
- Domain (for production)

---

### Change App Version:
Edit `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",    // ← Change this
    "android": {
      "versionCode": 2     // ← Add this (auto-increments)
    }
  }
}
```

---

## 🔧 BUILD OPTIONS:

### Standard Build (Recommended):
```bash
eas build -p android --profile preview
```

### Build with Auto-Submit:
```bash
eas build -p android --profile preview --auto-submit
```

### Build Locally (Advanced):
```bash
eas build -p android --profile preview --local
```

### Check Build Status:
```bash
eas build:list
```

### View Build Details:
```bash
eas build:view [build-id]
```

---

## 📊 BUILD PROCESS TIMELINE:

```
Step 1: Configuration Check         [~5 seconds]
Step 2: Code Upload                 [~30 seconds]
Step 3: Dependencies Install        [~3 minutes]
Step 4: Build Android APK           [~10 minutes]
Step 5: Upload to CDN              [~1 minute]
Total: ~15-20 minutes
```

**You'll get email when build completes!**

---

## 🎨 WHAT'S INCLUDED IN APK:

### App Features:
- ✅ Login screen (beautiful purple gradient)
- ✅ Patient dashboard
- ✅ Vital signs tracking
- ✅ Wearables integration UI
- ✅ Medications management
- ✅ Profile & settings
- ✅ Bottom tab navigation
- ✅ All icons & assets

### App Info:
- **Name:** Medwell
- **Package:** com.biofarma.medwell
- **Version:** 1.0.0
- **Size:** ~50-80 MB
- **Min Android:** 5.0 (API 21)
- **Target Android:** 13 (API 33)

---

## 🆘 TROUBLESHOOTING:

### Error 1: EAS CLI not found
```bash
# Install globally
npm install -g eas-cli

# Verify
eas --version
```

### Error 2: Not logged in
```bash
# Login
eas login

# Check account
eas whoami
```

### Error 3: Build failed
```bash
# View build logs
eas build:list
eas build:view [build-id]

# Check error message
# Fix issue in code
# Rebuild
```

### Error 4: Package name conflict
```bash
# Change package name in app.json
"android": {
  "package": "com.biofarma.medwell.v2"
}
```

---

## 💡 BEST PRACTICES:

### Before Building:
1. ✅ Test app with `npx expo start`
2. ✅ Fix all bugs
3. ✅ Test on emulator
4. ✅ Update version number
5. ✅ Configure API URL correctly

### After Building:
1. ✅ Download APK
2. ✅ Install on real device
3. ✅ Test all features
4. ✅ Check for crashes
5. ✅ Get feedback

---

## 📱 TEST APK CHECKLIST:

After installing APK on device:

### Installation:
- [ ] APK installs without errors
- [ ] App icon appears
- [ ] App opens

### Visual:
- [ ] Purple gradient displays
- [ ] All icons load
- [ ] Text readable
- [ ] Buttons visible
- [ ] Layout correct

### Functionality:
- [ ] Login screen works
- [ ] Navigation smooth
- [ ] All tabs accessible
- [ ] Screens load
- [ ] No crashes

### API Connection:
- [ ] Can connect to backend (if backend running)
- [ ] Login works (if API ready)
- [ ] Data loads (if API ready)

---

## 🎯 BUILD VARIANTS:

### Development Build:
```bash
eas build -p android --profile development
```
- Includes dev tools
- Larger size
- Debugging enabled

### Preview Build (Current):
```bash
eas build -p android --profile preview
```
- For testing
- No dev tools
- Smaller size
- **Use this for demos!**

### Production Build:
```bash
eas build -p android --profile production
```
- For Google Play
- Optimized
- AAB format
- Signed

---

## 📦 BUILD OUTPUT:

### What You Get:
```
build-xxxxxxxxxx.apk

Size: ~50-80 MB
Format: APK
Compatible: Android 5.0+
Signed: Yes (internal)
Installable: Yes (any Android device)
```

### Download Options:
1. **Direct link** - Click and download
2. **Expo dashboard** - https://expo.dev
3. **QR code** - Scan to download
4. **Email** - Link sent to email

---

## 🚀 READY TO BUILD!

### Quick Commands:
```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Build APK
cd D:\AI\medwell\mobile
eas build -p android --profile preview

# 4. Wait for download link (~15 minutes)

# 5. Download & install APK
```

---

## 📚 RESOURCES:

### Documentation:
- EAS Build: https://docs.expo.dev/build/introduction/
- App Config: https://docs.expo.dev/versions/latest/config/app/
- Build Profiles: https://docs.expo.dev/build-reference/eas-json/

### Dashboard:
- Your builds: https://expo.dev/accounts/[username]/projects/medwell-mobile/builds
- Account: https://expo.dev/accounts/[username]

---

## ✅ SUMMARY:

**To build APK:**
1. Install EAS CLI (`npm install -g eas-cli`)
2. Login (`eas login`)
3. Build (`eas build -p android --profile preview`)
4. Wait (~15 minutes)
5. Download APK
6. Install on device
7. Test app

**Easy!** 🎉

---

# 🎊 READY TO BUILD APK! LET'S GO! 🚀

**Start with:**
```bash
npm install -g eas-cli
```

# ⚡ QUICK BUILD APK - 3 COMMANDS!

## 🚀 SUPER QUICK (Copy-Paste):

```bash
# 1. Install EAS CLI (first time only)
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Build APK
cd D:\AI\medwell\mobile
eas build -p android --profile preview
```

**Wait ~15 minutes → Download link → Install APK → Done!** 🎉

---

## 📱 WHAT YOU'LL GET:

- **File:** `build-xxxxx.apk` (~50-80 MB)
- **Package:** com.biofarma.medwell
- **Version:** 1.0.0
- **Name:** Medwell
- **Ready to install:** Yes! ✅

---

## 🎯 BUILD PROFILES:

### For Testing (Recommended):
```bash
eas build -p android --profile preview
```
→ APK file (install anywhere)

### For Google Play Store:
```bash
eas build -p android --profile production
```
→ AAB file (for Play Store only)

---

## ⚙️ CONFIGURATION:

### Already Configured! ✅
- `eas.json` - Build settings
- `app.json` - App metadata
- Package name: com.biofarma.medwell
- API URL: http://192.168.1.100:8000/api/v1

### Want to change API URL?
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

---

## 🔍 CHECK BUILD STATUS:

```bash
# List all builds
eas build:list

# View specific build
eas build:view [build-id]

# Check who's logged in
eas whoami
```

---

## 📥 DOWNLOAD APK:

### Method 1: Click Link
Build completes → Click download link → Save APK

### Method 2: Expo Dashboard
Visit: https://expo.dev → Your Projects → Medwell → Builds

### Method 3: QR Code
Scan QR code → Download → Install

---

## 📱 INSTALL ON DEVICE:

### Android Phone:
1. Transfer APK via USB or download link
2. Open APK file
3. Allow "Install from Unknown Sources"
4. Install
5. Open Medwell app
6. Test! 🎉

---

## 🆘 IF ERROR:

### Error: EAS CLI not found
```bash
npm install -g eas-cli
```

### Error: Not logged in
```bash
eas login
```

### Error: Build failed
```bash
# Check logs
eas build:list
eas build:view [build-id]
```

---

## ⏱️ BUILD TIMELINE:

```
Upload code:           ~30 seconds
Install dependencies:  ~3 minutes
Build APK:            ~10 minutes
Upload to CDN:        ~1 minute
────────────────────────────────
Total:                ~15 minutes
```

**You'll get email notification when done!** 📧

---

## ✅ BEFORE BUILDING:

- [ ] Test app locally (`npx expo start`)
- [ ] All screens working
- [ ] No errors
- [ ] Update version if needed
- [ ] Check API URL in eas.json

---

## 🎉 AFTER BUILDING:

- [ ] Download APK
- [ ] Install on device
- [ ] Test all features
- [ ] Check for crashes
- [ ] Share with testers

---

## 💡 TIPS:

### Speed Up Build:
- Build during off-peak hours
- Use stable internet
- Don't cancel mid-build

### Test Before Building:
```bash
# Local test
npx expo start
# Press 'a' for Android

# Test everything works
# Then build APK
```

### Update Version:
Edit `app.json`:
```json
{
  "version": "1.0.1"
}
```

---

## 📚 FULL GUIDE:

For detailed guide, see: `BUILD_APK_NOW.md`

---

# 🚀 START BUILDING:

```bash
npm install -g eas-cli
eas login
cd D:\AI\medwell\mobile
eas build -p android --profile preview
```

**EASY! 3 commands to APK!** 🎊

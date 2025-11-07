# 📱 CARA LOGIN DI MOBILE APP - STEP BY STEP

## 🎯 LANGKAH-LANGKAH LOGIN:

### ✅ Step 1: Buka App di Browser
```
URL: http://localhost:19006/
```

**Yang kamu lihat:**
- Login screen dengan logo MEDWELL (purple gradient)
- 4 tombol login:
  1. Continue with Fitbit
  2. Continue with Apple Watch  
  3. Continue with Huawei
  4. Continue with Email ← **INI YANG DI KLIK!**

---

### ✅ Step 2: Klik "Continue with Email"

**Dimana button-nya?**
- Button paling bawah
- Ada icon ✉️ email
- Text: "Continue with Email"
- Background: putih dengan border

**Klik button ini!** 👆

---

### ✅ Step 3: Halaman Login Form Muncul

Setelah klik, browser akan navigate ke form login dengan:

**Yang kamu akan lihat:**
```
[← Back Button]      (kiri atas, kalau mau balik)

🫀 MEDWELL
Sign in to your account

┌─────────────────────────────────┐
│ 🖥️ Connected to Backend:        │
│ API: http://localhost:8000/...  │
│ Use your backend credentials    │
└─────────────────────────────────┘

Username or Email
[👤 ___________________________]  ← KETIK DI SINI

Password  
[🔒 ___________________________] 👁️  ← KETIK DI SINI

          Forgot Password?

┌─────────────────────────────┐
│    🔓 Sign In               │  ← KLIK SETELAH ISI
└─────────────────────────────┘
```

---

### ✅ Step 4: Masukkan Credentials

**Masukkan:**
- **Username:** [dari database backend]
- **Password:** [dari database backend]

**Contoh:**
```
Username: patient
Password: (password dari users table)
```

---

### ✅ Step 5: Klik "Sign In"

**Klik button biru/purple "Sign In"**

**Yang terjadi:**
- Loading indicator muncul
- App connect ke backend
- Kalau berhasil → Dashboard terbuka! 🎉
- Kalau gagal → Error message muncul

---

## 🐛 TROUBLESHOOTING:

### Masalah 1: Button "Continue with Email" Tidak Klik-able
**Solusi:**
```
1. Refresh browser (F5)
2. Clear cache (Ctrl+Shift+R)
3. Check console (F12) untuk errors
```

---

### Masalah 2: Setelah Klik, Nothing Happens
**Cek:**
```
1. Buka Console (F12)
2. Lihat ada error merah?
3. Screenshot dan share
```

**Atau refresh Expo:**
```
Di terminal Expo, press:
r → Reload app
```

---

### Masalah 3: Form Tidak Muncul
**Solusi:**
```bash
# Stop Expo (Ctrl+C di terminal)
# Restart
cd D:\AI\medwell\mobile
npx expo start -c
# Press 'w' untuk web
```

---

## 📸 VISUAL GUIDE:

### Halaman 1: Main Login (4 Buttons)
```
╔════════════════════════════════╗
║                                ║
║        🫀 MEDWELL              ║
║   Your Healthy Lifestyle       ║
║        Assistant               ║
║                                ║
║  ┌──────────────────────────┐ ║
║  │  Continue with Fitbit    │ ║
║  └──────────────────────────┘ ║
║                                ║
║            OR                  ║
║                                ║
║  ┌──────────────────────────┐ ║
║  │ Continue with Apple Watch│ ║
║  └──────────────────────────┘ ║
║  ┌──────────────────────────┐ ║
║  │  Continue with Huawei    │ ║
║  └──────────────────────────┘ ║
║  ┌──────────────────────────┐ ║
║  │  Continue with Email ✉️  │ ← CLICK!
║  └──────────────────────────┘ ║
║                                ║
║  Don't have account? Sign Up   ║
╚════════════════════════════════╝
```

---

### Halaman 2: Email Login Form (After Click)
```
╔════════════════════════════════╗
║  [←]                           ║
║                                ║
║        🫀 MEDWELL              ║
║  Sign in to your account       ║
║                                ║
║  ┌──────────────────────────┐ ║
║  │ 🖥️ Connected to Backend: │ ║
║  │ localhost:8000/api/v1    │ ║
║  └──────────────────────────┘ ║
║                                ║
║  Username or Email             ║
║  ┌──────────────────────────┐ ║
║  │ 👤 [type here]           │ ║
║  └──────────────────────────┘ ║
║                                ║
║  Password                      ║
║  ┌──────────────────────────┐ ║
║  │ 🔒 [type here]        👁️ │ ║
║  └──────────────────────────┘ ║
║                                ║
║         Forgot Password?       ║
║                                ║
║  ┌──────────────────────────┐ ║
║  │      🔓 Sign In          │ ║
║  └──────────────────────────┘ ║
╚════════════════════════════════╝
```

---

## ✅ CHECKLIST:

Before logging in:
- [ ] Backend running? (`php artisan serve`)
- [ ] Expo running? (terminal shows "Metro waiting...")
- [ ] Browser open? (http://localhost:19006/)
- [ ] See 4 login buttons?

Click email button:
- [ ] Clicked "Continue with Email"?
- [ ] Form appeared?
- [ ] See username & password inputs?

Login:
- [ ] Entered username from database
- [ ] Entered password from database
- [ ] Clicked "Sign In"
- [ ] Backend responding? (check terminal)

---

## 🔍 DEBUG INFO:

### Check if EmailLoginScreen exists:
```bash
# Run this to verify file exists
dir "D:\AI\medwell\mobile\src\screens\auth\EmailLoginScreen.js"
```

### Check Expo logs:
```
In Expo terminal, you should see:
- No red errors
- When clicking button, should show navigation
```

### Check browser console:
```
Press F12 in browser
Go to Console tab
Look for errors (red text)
```

---

## 💡 QUICK FIX:

**If button not working, restart Expo:**
```bash
# In Expo terminal:
Press: Ctrl+C (stop)

# Then:
cd D:\AI\medwell\mobile
npx expo start -c

# Press 'w' when ready
```

---

## 🎯 SUMMARY:

**To see login form:**
1. Open http://localhost:19006/
2. **Click "Continue with Email" button** (bottom)
3. Form with username/password appears
4. Enter backend credentials
5. Click "Sign In"
6. Dashboard opens!

**Currently you're on:** Main login screen (4 buttons)  
**Need to click:** "Continue with Email" button  
**Then you'll see:** Form with username & password inputs

---

## 📞 IF STILL NOT WORKING:

**Take screenshot of:**
1. Browser screen (what you see)
2. Expo terminal (logs)
3. Browser console (F12 → Console tab)

**And we'll debug!**

---

# 🎯 KLIK "CONTINUE WITH EMAIL" UNTUK LIHAT FORM! 👆

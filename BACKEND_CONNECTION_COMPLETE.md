# ✅ MOBILE APP CONNECTED TO BACKEND!

## 🎉 INTEGRATION COMPLETE!

Mobile app sekarang terhubung langsung ke backend Laravel di `http://localhost:8000/`

---

## 🔑 LOGIN CREDENTIALS:

### Gunakan Account dari Backend Database:

Login dengan username DAN password dari database `users` table!

**Example accounts** (sesuaikan dengan database kamu):
```sql
-- Check users in database
SELECT username, email, role FROM users WHERE role = 'patient';
```

**Atau buat account baru via seeder/migration:**
```php
// Example patient account
username: patient
password: patient123  // sesuai yang di database
email: patient@medwell.id
```

---

## 🔗 API ENDPOINTS:

### Backend API:
```
Base URL: http://localhost:8000/api/v1

Auth Endpoints:
POST /auth/login       → Login with username/password
POST /auth/register    → Register new patient
POST /auth/logout      → Logout (requires token)
GET  /auth/me          → Get current user
POST /auth/refresh     → Refresh token
```

### Patient Endpoints (requires auth):
```
GET  /patient/dashboard          → Dashboard data
GET  /vitals/latest              → Latest vitals
GET  /vitals/history             → Vitals history
GET  /medications                → Medications list
GET  /medications/schedule/today → Today's schedule
POST /medications/{id}/taken     → Mark as taken
GET  /wearables/data/today       → Wearable data
GET  /notifications              → Notifications
GET  /notifications/unread       → Unread notifications
```

---

## 📱 HOW IT WORKS:

### Login Flow:
```
1. User opens app
2. Clicks "Continue with Email"
3. Enters username & password (from backend database)
4. Mobile app sends POST request to:
   http://localhost:8000/api/v1/auth/login
   {
     "username": "patient",
     "password": "patient123"
   }
5. Backend validates credentials
6. Backend returns:
   {
     "success": true,
     "data": {
       "user": {...},
       "profile": {...},
       "token": "sanctum_token_here",
       "token_type": "Bearer"
     }
   }
7. Mobile stores token in AsyncStorage
8. Mobile navigates to Dashboard
9. All future API calls include token in header:
   Authorization: Bearer {token}
```

---

## 🔧 FILES MODIFIED:

### Backend (Laravel):
1. ✅ `app/Http/Controllers/Api/AuthApiController.php`
   - Updated login to support username OR email
   - Changed validation from 'email' to 'username'
   - Auto-detects if input is email or username

### Mobile (React Native):
1. ✅ `src/api/auth.js`
   - Changed from 'email' to 'username' parameter
   
2. ✅ `src/screens/auth/EmailLoginScreen.js`
   - Removed demo credentials logic
   - Calls real backend API via authAPI.login()
   - Stores real token from backend
   - Better error handling with network error messages
   
3. ✅ `src/api/client.js`
   - Already configured to http://localhost:8000/api/v1
   - Axios interceptor adds Bearer token
   - 401 auto-logout implemented

---

## 🧪 TESTING:

### Step 1: Make Sure Backend is Running
```bash
cd D:\AI\medwell\backend_2
php artisan serve
```

**Output should show:**
```
Starting Laravel development server: http://127.0.0.1:8000
```

---

### Step 2: Test API Manually (Optional)
```bash
# Test health check
curl http://localhost:8000/api/v1/health

# Test login (replace with your credentials)
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"patient\",\"password\":\"patient123\"}"
```

---

### Step 3: Test Mobile App

**A. In Web Browser (Expo):**
```
1. Mobile app should be running (npx expo start)
2. Press 'w' to open in browser
3. Click "Continue with Email"
4. Enter backend credentials:
   - Username: [from database]
   - Password: [from database]
5. Click "Sign In"
6. ✅ Should login if backend is running!
7. ❌ Should show connection error if backend is OFF
```

**B. Connection Error Test:**
```
1. Stop backend (Ctrl+C in backend terminal)
2. Try to login in mobile app
3. Should show: "Cannot connect to server. Please check..."
4. Start backend again
5. Try login again → Should work! ✅
```

---

## ⚠️ IMPORTANT NOTES:

### For Web Browser (Expo Web):
- ✅ `localhost:8000` works fine
- Backend and mobile both on same machine

### For Android Emulator:
- ❌ `localhost:8000` won't work!
- ✅ Use `10.0.2.2:8000` instead

**To fix for Android emulator:**
```javascript
// File: src/api/client.js
const API_URL = __DEV__
  ? 'http://10.0.2.2:8000/api/v1'  // ← Change to this for Android
  : 'http://192.168.1.100:8000/api/v1';
```

### For Physical Device:
- ❌ `localhost:8000` won't work!
- ✅ Use your computer IP address

**Find your IP:**
```bash
# Windows
ipconfig
# Look for "IPv4 Address"

# Example: 192.168.1.100
```

**Update API URL:**
```javascript
const API_URL = __DEV__
  ? 'http://192.168.1.100:8000/api/v1'  // ← Your computer IP
  : 'http://192.168.1.100:8000/api/v1';
```

---

## 🎯 AUTHENTICATION FEATURES:

### ✅ Implemented:
- Login with username OR email
- Password authentication
- Laravel Sanctum token
- Token stored in AsyncStorage
- Auto token injection in API calls
- Auto logout on 401 error
- Error handling (validation, network, auth)
- Loading states
- User data storage

### Backend Features:
- Email OR username login
- Password hashing (bcrypt)
- Sanctum token generation
- Token middleware protection
- Last login tracking
- User profile loading (patient)

---

## 📊 API REQUEST/RESPONSE:

### Login Request:
```json
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "patient",
  "password": "patient123"
}
```

### Success Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "patient",
      "email": "patient@medwell.id",
      "role": "patient",
      "status": "active",
      "last_login_at": "2025-11-07T12:00:00.000000Z"
    },
    "profile": {
      "id": 1,
      "user_id": 1,
      "full_name": "John Doe",
      "date_of_birth": "1990-01-01",
      "gender": "male",
      "phone": "+6281234567890"
    },
    "token": "1|laravel_sanctum_xxxxxxxxxxxxx",
    "token_type": "Bearer"
  }
}
```

### Error Response (Wrong Credentials):
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### Error Response (Validation Error):
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "username": ["The username field is required."],
    "password": ["The password field is required."]
  }
}
```

---

## 🚀 NEXT STEPS:

### After Successful Login:

**Mobile app will:**
1. ✅ Store token in AsyncStorage
2. ✅ Store user data
3. ✅ Navigate to Dashboard
4. ✅ Load dashboard data from backend
5. ✅ All API calls authenticated with token

**Dashboard will call:**
```
GET /api/v1/patient/dashboard
Authorization: Bearer {token}
```

**Future API calls:**
- All use stored token
- Auto-logout if token invalid
- Refresh token when needed

---

## 🔐 SECURITY:

### Mobile App:
- ✅ Token stored securely (AsyncStorage)
- ✅ HTTPS recommended for production
- ✅ No passwords stored
- ✅ Auto logout on 401
- ✅ Token refresh capability

### Backend:
- ✅ Password hashing (bcrypt)
- ✅ Sanctum token encryption
- ✅ Token expiration configurable
- ✅ CORS configured
- ✅ Rate limiting available

---

## 📦 BUILD APK NOW?

**App is ready to build with real backend integration!**

```bash
# Login to Expo
eas login

# Build APK
cd D:\AI\medwell\mobile
eas build -p android --profile preview

# Wait ~15 minutes
# Download APK
# Install & test with real credentials!
```

**APK will:**
- ✅ Connect to backend
- ✅ Use real authentication
- ✅ Store real tokens
- ✅ Load real user data

**Note:** Untuk APK production, update API URL di `eas.json` ke server IP atau domain!

---

## 📚 TESTING CHECKLIST:

### Backend Testing:
- [ ] Backend running at http://localhost:8000
- [ ] API health check works
- [ ] Login endpoint works (test with curl/Postman)
- [ ] Database has patient users

### Mobile Testing (Web):
- [ ] Expo running (npx expo start → press 'w')
- [ ] Login screen displays
- [ ] Backend connection info shows
- [ ] Can enter credentials
- [ ] Login with correct credentials → Dashboard
- [ ] Login with wrong credentials → Error
- [ ] Backend offline → Connection error

### Mobile Testing (Android):
- [ ] Update API URL to 10.0.2.2:8000
- [ ] Build APK or run on emulator
- [ ] Test login flow
- [ ] Verify token storage
- [ ] Test API calls

---

## ✅ SUMMARY:

**Connected:**
- ✅ Mobile → Backend API
- ✅ Login → Real authentication
- ✅ Token → Sanctum bearer token
- ✅ Storage → AsyncStorage
- ✅ Error handling → Network + Auth errors

**Use:**
- Username/email dari database users
- Password dari database users
- Backend MUST be running
- localhost:8000 untuk web
- 10.0.2.2:8000 untuk Android emulator
- IP address untuk physical device

**Test:**
```
1. Start backend: php artisan serve
2. Start mobile: npx expo start → 'w'
3. Click "Email Login"
4. Enter backend credentials
5. Click "Sign In"
6. ✅ Dashboard opens with real data!
```

---

# 🎉 MOBILE & BACKEND CONNECTED! READY TO TEST! 🚀

**Backend:** http://localhost:8000  
**Mobile:** Connect & test with real credentials!

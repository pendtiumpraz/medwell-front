@echo off
echo ========================================
echo   MEDWELL MOBILE - APK BUILD SCRIPT
echo ========================================
echo.

cd /d D:\AI\medwell\mobile

echo Pilih mode build:
echo.
echo 1. EAS Build (Cloud) - RECOMMENDED
echo 2. Local Build (Manual)
echo 3. Expo Go (Dev Server)
echo.
set /p choice=Masukkan pilihan (1/2/3): 

if "%choice%"=="1" goto eas_build
if "%choice%"=="2" goto local_build
if "%choice%"=="3" goto expo_go
goto end

:eas_build
echo.
echo ========================================
echo   EAS BUILD - CLOUD BUILD
echo ========================================
echo.
echo Langkah-langkah:
echo 1. Install EAS CLI (jika belum)
echo 2. Login ke Expo account
echo 3. Build APK preview
echo.
pause

echo.
echo [1/3] Installing EAS CLI...
call npm install -g eas-cli
echo.

echo [2/3] Login to Expo...
call eas login
echo.

echo [3/3] Building APK...
echo.
echo Build mode:
echo 1. Preview (APK for testing)
echo 2. Production (AAB for Play Store)
echo.
set /p build_mode=Pilih mode (1/2): 

if "%build_mode%"=="1" (
    echo.
    echo Building PREVIEW APK...
    call eas build -p android --profile preview
) else (
    echo.
    echo Building PRODUCTION AAB...
    call eas build -p android --profile production
)

echo.
echo ========================================
echo   BUILD COMPLETE!
echo ========================================
echo.
echo Check your Expo dashboard for download link:
echo https://expo.dev
echo.
goto end

:local_build
echo.
echo ========================================
echo   LOCAL BUILD - MANUAL
echo ========================================
echo.
echo WARNING: Requires Android Studio installed!
echo.
pause

echo.
echo [1/4] Installing dependencies...
call npm install
echo.

echo [2/4] Running prebuild (eject)...
call npx expo prebuild --platform android
echo.

echo [3/4] Building APK...
cd android
call gradlew assembleDebug
cd ..
echo.

echo [4/4] APK Location:
echo D:\AI\medwell\mobile\android\app\build\outputs\apk\debug\app-debug.apk
echo.
goto end

:expo_go
echo.
echo ========================================
echo   EXPO GO - DEV SERVER
echo ========================================
echo.
echo Langkah:
echo 1. Install Expo Go dari Play Store
echo 2. Pastikan laptop dan HP satu WiFi
echo 3. Scan QR code yang muncul
echo.
pause

echo.
echo [1/2] Installing dependencies...
call npm install
echo.

echo [2/2] Starting Expo dev server...
echo.
echo ========================================
echo   Scan QR code with Expo Go app!
echo ========================================
echo.
call npx expo start
goto end

:end
echo.
pause

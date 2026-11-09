@echo off
chcp 65001 >nul
title تثبيت Store Manager Pro على نظام ويندوز
color 0B

echo ===================================================================
echo             Store Manager Pro - مثبت تطبيق سطح المكتب
echo                      نظام ويندوز 10 / 11
echo ===================================================================
echo.

set APP_URL=https://ais-dev-pyd6rnrrmlzqyhhvhw4g63-786955012946.europe-west2.run.app
set APP_TITLE=Store Manager Pro
set INSTALL_DIR=%LOCALAPPDATA%\StoreManagerPro

echo [1/4] جاري إنشاء مجلد التطبيق في ويندوز...
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

echo [2/4] جاري تنزيل أيقونة التطبيق الرسمية...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%APP_URL%/favicon.ico', '%INSTALL_DIR%\icon.ico')" >nul 2>&1

:: تحديد مسار متصفح Edge أو Chrome
set BROWSER_PATH=
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_PATH=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_PATH=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_PATH=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_PATH=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
)

if "%BROWSER_PATH%"=="" (
    echo [!] لم يتم العثور على Edge أو Chrome، سيتم استخدام متصفح النظام الافتراضي.
    set TARGET_CMD=explorer.exe
    set ARGS="%APP_URL%"
) else (
    set "TARGET_CMD=%BROWSER_PATH%"
    set ARGS=--app="%APP_URL%"
)

echo [3/4] جاري إنشاء اختصارات سطح المكتب وقائمة ابدأ (Start Menu)...

:: إنشاء اختصار سطح المكتب عبر PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ws = New-Object -ComObject WScript.Shell; " ^
    "$s = $ws.CreateShortcut([IO.Path]::Combine([Environment]::GetFolderPath('Desktop'), 'Store Manager Pro.lnk')); " ^
    "$s.TargetPath = '%TARGET_CMD%'; " ^
    "$s.Arguments = '%ARGS%'; " ^
    "$s.Description = 'Store Manager Pro - نظام إدارة المتاجر والمخزون'; " ^
    "if (Test-Path '%INSTALL_DIR%\icon.ico') { $s.IconLocation = '%INSTALL_DIR%\icon.ico,0' } else { $s.IconLocation = '%TARGET_CMD%,0' }; " ^
    "$s.Save();"

:: إنشاء اختصار في قائمة ابدأ (Start Menu)
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ws = New-Object -ComObject WScript.Shell; " ^
    "$startMenu = [Environment]::GetFolderPath('Programs'); " ^
    "$s = $ws.CreateShortcut([IO.Path]::Combine($startMenu, 'Store Manager Pro.lnk')); " ^
    "$s.TargetPath = '%TARGET_CMD%'; " ^
    "$s.Arguments = '%ARGS%'; " ^
    "$s.Description = 'Store Manager Pro - نظام إدارة المتاجر والمخزون'; " ^
    "if (Test-Path '%INSTALL_DIR%\icon.ico') { $s.IconLocation = '%INSTALL_DIR%\icon.ico,0' } else { $s.IconLocation = '%TARGET_CMD%,0' }; " ^
    "$s.Save();"

echo [4/4] تم التثبيت بنجاح!
echo.
echo ===================================================================
echo  تهانينا! تم تثبيت Store Manager Pro بنجاح على جهازك:
echo   1. تم إنشاء أيقونة على سطح المكتب (Desktop Shortcut).
echo   2. تمت إضافة التطبيق إلى قائمة ابدأ (Start Menu).
echo   3. يعمل النظام الآن كنافذة تطبيق مستقلة بدون متصفح.
echo ===================================================================
echo.
echo جاري تشغيل التطبيق الآن...
start "" "%TARGET_CMD%" %ARGS%

timeout /t 4 >nul
exit

@echo off
chcp 65001 >nul
title Store Manager Pro - مشغل التطبيق على ويندوز
color 0B

echo ========================================================
echo         Store Manager Pro - مشغل نظام إدارة المتاجر
echo                   نسخة سطح المكتب لويندوز
echo ========================================================
echo.

set APP_URL=https://ais-dev-pyd6rnrrmlzqyhhvhw4g63-786955012946.europe-west2.run.app

echo [1/3] جاري فحص بيئة تشغيل ويندوز...
echo.

:: البحث عن متصفح Microsoft Edge أو Google Chrome للتشغيل بوضع التطبيق المستقل App Mode
set BROWSER_FOUND=0

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    echo [2/3] تم العثور على Microsoft Edge. تشغيل كنافذة مستقلة (Native App Window)...
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="%APP_URL%"
    set BROWSER_FOUND=1
    goto :FINISH
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    echo [2/3] تم العثور على Microsoft Edge. تشغيل كنافذة مستقلة (Native App Window)...
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="%APP_URL%"
    set BROWSER_FOUND=1
    goto :FINISH
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    echo [2/3] تم العثور على Google Chrome. تشغيل كنافذة مستقلة (Native App Window)...
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="%APP_URL%"
    set BROWSER_FOUND=1
    goto :FINISH
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    echo [2/3] تم العثور على Google Chrome. تشغيل كنافذة مستقلة (Native App Window)...
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="%APP_URL%"
    set BROWSER_FOUND=1
    goto :FINISH
)

if %BROWSER_FOUND%==0 (
    echo [2/3] فتح التطبيق عبر المتصفح الافتراضي...
    start "" "%APP_URL%"
)

:FINISH
echo.
echo [3/3] تم إطلاق Store Manager Pro بنجاح!
echo --------------------------------------------------------
echo نصيحة: يمكنك تثبيت التطبيق بشكل دائم على سطح المكتب
echo عبر النقر على أيقونة (تثبيت التطبيق) في شريط المتصفح العلوي.
echo --------------------------------------------------------
timeout /t 5 >nul
exit

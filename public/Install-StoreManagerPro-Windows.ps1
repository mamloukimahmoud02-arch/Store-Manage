# Store Manager Pro - Windows Desktop Installer
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "         Store Manager Pro - مثبت تطبيق سطح المكتب لويندوز" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

$AppUrl = "https://ais-dev-pyd6rnrrmlzqyhhvhw4g63-786955012946.europe-west2.run.app"
$InstallDir = "$env:LOCALAPPDATA\StoreManagerPro"

if (!(Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
}

# Download Icon
$IconPath = "$InstallDir\icon.ico"
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri "$AppUrl/favicon.ico" -OutFile $IconPath -UseBasicParsing -TimeoutSec 10
} catch {}

# Find Edge or Chrome
$BrowserPath = ""
$EdgePaths = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)
$ChromePaths = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
)

foreach ($p in $EdgePaths + $ChromePaths) {
    if (Test-Path $p) {
        $BrowserPath = $p
        break
    }
}

if ($BrowserPath -ne "") {
    $Target = $BrowserPath
    $Arguments = "--app=""$AppUrl"""
} else {
    $Target = "explorer.exe"
    $Arguments = """$AppUrl"""
}

$WshShell = New-Object -ComObject WScript.Shell

# 1. Desktop Shortcut
$DesktopPath = [Environment]::GetFolderPath('Desktop')
$Shortcut = $WshShell.CreateShortcut("$DesktopPath\Store Manager Pro.lnk")
$Shortcut.TargetPath = $Target
$Shortcut.Arguments = $Arguments
$Shortcut.Description = "Store Manager Pro - نظام إدارة المتاجر والمخزون"
if (Test-Path $IconPath) {
    $Shortcut.IconLocation = "$IconPath,0"
}
$Shortcut.Save()

# 2. Start Menu Shortcut
$StartMenuPath = [Environment]::GetFolderPath('Programs')
$StartShortcut = $WshShell.CreateShortcut("$StartMenuPath\Store Manager Pro.lnk")
$StartShortcut.TargetPath = $Target
$StartShortcut.Arguments = $Arguments
$StartShortcut.Description = "Store Manager Pro - نظام إدارة المتاجر والمخزون"
if (Test-Path $IconPath) {
    $StartShortcut.IconLocation = "$IconPath,0"
}
$StartShortcut.Save()

Write-Host "[✓] تم إنشاء اختصار سطح المكتب بنجاح: $DesktopPath\Store Manager Pro.lnk" -ForegroundColor Green
Write-Host "[✓] تمت إضافة التطبيق إلى قائمة ابدأ (Start Menu)." -ForegroundColor Green
Write-Host ""
Write-Host "جاري تشغيل Store Manager Pro..." -ForegroundColor Yellow
Start-Process $Target -ArgumentList $Arguments

#define UNICODE
#define _UNICODE
#include <windows.h>
#include <shlobj.h>
#include <objbase.h>
#include <stdio.h>
#include <stdbool.h>

const wchar_t* APP_URL = L"https://ais-dev-pyd6rnrrmlzqyhhvhw4g63-786955012946.europe-west2.run.app";
const wchar_t* APP_NAME = L"Store Manager Pro";
const wchar_t* APP_DESC = L"Store Manager Pro - نظام إدارة المتاجر والمخزون";

bool FileExists(const wchar_t* path) {
    DWORD dwAttrib = GetFileAttributesW(path);
    return (dwAttrib != INVALID_FILE_ATTRIBUTES && !(dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

bool CreateShortcut(const wchar_t* shortcutPath, const wchar_t* targetPath, const wchar_t* args, const wchar_t* iconPath, const wchar_t* description) {
    IShellLinkW* psl = NULL;
    HRESULT hr = CoCreateInstance(&CLSID_ShellLink, NULL, CLSCTX_INPROC_SERVER, &IID_IShellLinkW, (void**)&psl);
    if (SUCCEEDED(hr)) {
        IPersistFile* ppf = NULL;
        psl->lpVtbl->SetPath(psl, targetPath);
        psl->lpVtbl->SetArguments(psl, args);
        psl->lpVtbl->SetDescription(psl, description);
        if (iconPath && wcslen(iconPath) > 0) {
            psl->lpVtbl->SetIconLocation(psl, iconPath, 0);
        }
        hr = psl->lpVtbl->QueryInterface(psl, &IID_IPersistFile, (void**)&ppf);
        if (SUCCEEDED(hr)) {
            hr = ppf->lpVtbl->Save(ppf, shortcutPath, TRUE);
            ppf->lpVtbl->Release(ppf);
        }
        psl->lpVtbl->Release(psl);
        return SUCCEEDED(hr);
    }
    return false;
}

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow) {
    CoInitialize(NULL);

    // 1. Determine Local App Data Directory
    wchar_t localAppData[MAX_PATH];
    if (FAILED(SHGetFolderPathW(NULL, CSIDL_LOCAL_APPDATA, NULL, 0, localAppData))) {
        GetTempPathW(MAX_PATH, localAppData);
    }

    wchar_t installDir[MAX_PATH];
    swprintf(installDir, MAX_PATH, L"%s\\StoreManagerPro", localAppData);
    CreateDirectoryW(installDir, NULL);

    // Save icon path
    wchar_t exePath[MAX_PATH];
    GetModuleFileNameW(NULL, exePath, MAX_PATH);

    wchar_t iconTarget[MAX_PATH];
    swprintf(iconTarget, MAX_PATH, L"%s\\icon.ico", installDir);
    CopyFileW(exePath, iconTarget, FALSE); // Or use the EXE itself as the icon source

    // 2. Locate Browser (Edge or Chrome)
    wchar_t browserPath[MAX_PATH] = L"";
    wchar_t args[1024];

    wchar_t progFiles86[MAX_PATH];
    wchar_t progFiles[MAX_PATH];
    SHGetFolderPathW(NULL, CSIDL_PROGRAM_FILESX86, NULL, 0, progFiles86);
    SHGetFolderPathW(NULL, CSIDL_PROGRAM_FILES, NULL, 0, progFiles);

    wchar_t testPath[MAX_PATH];

    // Check Edge x86
    swprintf(testPath, MAX_PATH, L"%s\\Microsoft\\Edge\\Application\\msedge.exe", progFiles86);
    if (FileExists(testPath)) {
        wcscpy(browserPath, testPath);
    } else {
        // Check Edge x64
        swprintf(testPath, MAX_PATH, L"%s\\Microsoft\\Edge\\Application\\msedge.exe", progFiles);
        if (FileExists(testPath)) {
            wcscpy(browserPath, testPath);
        } else {
            // Check Chrome x64
            swprintf(testPath, MAX_PATH, L"%s\\Google\\Chrome\\Application\\chrome.exe", progFiles);
            if (FileExists(testPath)) {
                wcscpy(browserPath, testPath);
            } else {
                // Check Chrome x86
                swprintf(testPath, MAX_PATH, L"%s\\Google\\Chrome\\Application\\chrome.exe", progFiles86);
                if (FileExists(testPath)) {
                    wcscpy(browserPath, testPath);
                }
            }
        }
    }

    if (wcslen(browserPath) > 0) {
        swprintf(args, 1024, L"--app=\"%s\"", APP_URL);
    } else {
        wcscpy(browserPath, L"explorer.exe");
        swprintf(args, 1024, L"\"%s\"", APP_URL);
    }

    // 3. Create Desktop Shortcut
    wchar_t desktopPath[MAX_PATH];
    SHGetFolderPathW(NULL, CSIDL_DESKTOP, NULL, 0, desktopPath);
    wchar_t desktopShortcut[MAX_PATH];
    swprintf(desktopShortcut, MAX_PATH, L"%s\\%s.lnk", desktopPath, APP_NAME);

    CreateShortcut(desktopShortcut, browserPath, args, exePath, APP_DESC);

    // 4. Create Start Menu Programs Shortcut
    wchar_t programsPath[MAX_PATH];
    SHGetFolderPathW(NULL, CSIDL_PROGRAMS, NULL, 0, programsPath);
    wchar_t startShortcut[MAX_PATH];
    swprintf(startShortcut, MAX_PATH, L"%s\\%s.lnk", programsPath, APP_NAME);

    CreateShortcut(startShortcut, browserPath, args, exePath, APP_DESC);

    // 5. Launch the application immediately
    ShellExecuteW(NULL, L"open", browserPath, args, NULL, SW_SHOWNORMAL);

    // 6. Show Success Dialog
    MessageBoxW(
        NULL,
        L"تهانينا! تم تثبيت Store Manager Pro بنجاح على نظام ويندوز:\n\n"
        L"✓ تم إنشاء اختصار رسمي على سطح المكتب (Desktop).\n"
        L"✓ تمت إضافة التطبيق إلى قائمة ابدأ (Start Menu).\n"
        L"✓ تم تشغيل التطبيق كنافذة مستقلة بنجاح.\n\n"
        L"Store Manager Pro has been installed successfully!",
        L"Store Manager Pro Setup",
        MB_OK | MB_ICONINFORMATION
    );

    CoUninitialize();
    return 0;
}

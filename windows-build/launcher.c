#define UNICODE
#define _UNICODE
#include <windows.h>
#include <shlobj.h>
#include <stdio.h>
#include <stdbool.h>

const wchar_t* APP_URL = L"https://ais-dev-pyd6rnrrmlzqyhhvhw4g63-786955012946.europe-west2.run.app";

bool FileExists(const wchar_t* path) {
    DWORD dwAttrib = GetFileAttributesW(path);
    return (dwAttrib != INVALID_FILE_ATTRIBUTES && !(dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow) {
    wchar_t browserPath[MAX_PATH] = L"";
    wchar_t args[1024];

    wchar_t progFiles86[MAX_PATH];
    wchar_t progFiles[MAX_PATH];
    SHGetFolderPathW(NULL, CSIDL_PROGRAM_FILESX86, NULL, 0, progFiles86);
    SHGetFolderPathW(NULL, CSIDL_PROGRAM_FILES, NULL, 0, progFiles);

    wchar_t testPath[MAX_PATH];

    swprintf(testPath, MAX_PATH, L"%s\\Microsoft\\Edge\\Application\\msedge.exe", progFiles86);
    if (FileExists(testPath)) {
        wcscpy(browserPath, testPath);
    } else {
        swprintf(testPath, MAX_PATH, L"%s\\Microsoft\\Edge\\Application\\msedge.exe", progFiles);
        if (FileExists(testPath)) {
            wcscpy(browserPath, testPath);
        } else {
            swprintf(testPath, MAX_PATH, L"%s\\Google\\Chrome\\Application\\chrome.exe", progFiles);
            if (FileExists(testPath)) {
                wcscpy(browserPath, testPath);
            } else {
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

    ShellExecuteW(NULL, L"open", browserPath, args, NULL, SW_SHOWNORMAL);
    return 0;
}

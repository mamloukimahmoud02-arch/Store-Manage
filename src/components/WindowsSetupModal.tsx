import React, { useState } from 'react';
import { 
  Monitor, 
  Download, 
  CheckCircle, 
  ExternalLink, 
  X, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Copy,
  Check,
  AlertTriangle,
  Play
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { getActiveAppUrl, downloadWindowsBatchInstaller } from '../utils/windowsInstaller';

interface WindowsSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WindowsSetupModal: React.FC<WindowsSetupModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIframe, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'installer' | 'pwa' | 'offline'>('installer');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [installStatus, setInstallStatus] = useState<string | null>(null);

  const standaloneUrl = getActiveAppUrl();

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const handleInstallClick = async () => {
    setInstallStatus('prompting');
    const success = await install();
    if (success) {
      setInstallStatus('success');
    } else {
      setInstallStatus('manual');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#0B2238] rounded-2xl border border-slate-200 dark:border-[#1B3B59] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-[#1B3B59] flex items-center justify-between bg-slate-50 dark:bg-[#07182B]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 flex items-center justify-center">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                تثبيت Store Manager Pro على Windows
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300 font-medium">
                  Windows 10 / 11
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تشغيل النظام كتطبيق سطح مكتب أصيل بدون متصفح مع اختصار سطح المكتب وقائمة ابدأ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#1B3B59] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe Warning Alert if inside preview */}
        {isIframe && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-amber-900 dark:text-amber-200">
                <p className="font-bold text-sm mb-0.5">تنبيه لبيئة المعاينة:</p>
                <p className="text-amber-800 dark:text-amber-300">
                  أنت تتصفح التطبيق حالياً داخل إطار مدمج (IFrame)، والمتصفحات تمنع التثبيت التلقائي للـ PWA داخل الإطارات. اختر أحد الإجراءين الفوريين أدناه:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pr-7 sm:pr-0">
              <a
                href="/StoreManagerPro-Setup.exe"
                download="StoreManagerPro-Setup.exe"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                تحميل الملف (Setup.exe)
              </a>

              <a
                href="/StoreManagerPro.exe"
                download="StoreManagerPro.exe"
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5" />
                المشغل المحمول (.exe)
              </a>
            </div>
          </div>
        )}

        {/* Tab Selector */}
        <div className="px-6 pt-3 border-b border-slate-200 dark:border-[#1B3B59] flex gap-2 bg-slate-50/50 dark:bg-[#091D30]">
          <button
            onClick={() => setActiveTab('installer')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'installer'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            تطبيق ويندوز التنفيذي (.exe)
            <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">
              صيغة EXE الرسمية
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'pwa'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            تثبيت عبر المتصفح (PWA)
          </button>

          <button
            onClick={() => setActiveTab('offline')}
            className={`pb-3 px-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'offline'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            التشغيل المحلي في Node
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'installer' && (
            <div className="space-y-4">
              {/* Primary Card: StoreManagerPro-Setup.exe */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 dark:from-[#082823] dark:via-[#092B38] dark:to-[#07182B] p-5 rounded-2xl border border-emerald-300 dark:border-emerald-700 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded font-mono">
                        EXE INSTALLER
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Windows 64-bit</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      مثبت ويندوز الرسمي (StoreManagerPro-Setup.exe)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md leading-relaxed">
                      برنامج تنفيذي مستقل بصيغة <strong>EXE</strong> مع أيقونة التطبيق الرسمية. يقوم تلقائياً بإنشاء اختصار لسطح المكتب وإضافته إلى قائمة ابدأ وتشغيل النظام في نافذة سطح مكتب منفصلة.
                    </p>
                  </div>

                  <a
                    href="/StoreManagerPro-Setup.exe"
                    download="StoreManagerPro-Setup.exe"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    تحميل Setup.exe
                  </a>
                </div>
              </div>

              {/* Secondary Card: StoreManagerPro.exe (Portable) */}
              <div className="bg-slate-50 dark:bg-[#0E2A44] p-4 rounded-xl border border-slate-200 dark:border-[#1E4366] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <Monitor className="w-4 h-4 text-sky-500" />
                    المشغل المحمول الفوري (StoreManagerPro.exe)
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    نسخة محمولة بدون تثبيت — انقر عليها مرتين لتشغيل التطبيق فوراً.
                  </p>
                </div>
                <a
                  href="/StoreManagerPro.exe"
                  download="StoreManagerPro.exe"
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  تحميل المشغل المحمول (.exe)
                </a>
              </div>

              {/* Instructions steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  طريقة تشغيل ملف الـ EXE في ويندوز:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                      1
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">تحميل ملف الـ EXE</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      انقر على الزر الأخضر أعلاه لتحميل ملف <code className="text-[10px] bg-slate-100 dark:bg-[#1B3B59] px-1 rounded">StoreManagerPro-Setup.exe</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">تشغيل الملف</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      انقر مرتين على الملف المحمّل. سيقوم فوراً بإعداد وتثبيت الاختصار على سطح المكتب.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                      3
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">جاهز للاستخدام الدائم</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      ستجد الأيقونة الرسمية في قائمة Start وعلى سطح المكتب، ويفتح التطبيق كنافذة سطح مكتب أصلية.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternate PowerShell option */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#091D30] border border-slate-200 dark:border-[#1B3B59] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-sky-500" />
                    خيار إضافي: مثبت PowerShell (.ps1)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    لمستخدمي بيئة PowerShell في ويندوز
                  </div>
                </div>
                <a
                  href="/Install-StoreManagerPro-Windows.ps1"
                  download="Install-StoreManagerPro-Windows.ps1"
                  className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-[#1B3B59] hover:bg-slate-300 dark:hover:bg-[#254d75] text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  تنزيل .ps1
                </a>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4">
              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                      التطبيق مثبت بالفعل على جهازك!
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                      أنت الآن تستخدم Store Manager Pro كنافذة سطح مكتب مستقلة (Desktop Standalone App).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* External Window Open Card */}
                  <div className="p-5 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/70 dark:bg-[#0E2A44] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-sky-500" />
                        الخطوة 1: فتح التطبيق في نافذة مستقلة خارج المنصة
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        لكي يظهر زر التثبيت في متصفحك (Edge / Chrome)، يجب فتح الرابط خارج إطار المعاينة.
                      </p>
                    </div>

                    <a
                      href={standaloneUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      فتح في نافذة كاملة
                    </a>
                  </div>

                  {/* Browser PWA Prompt */}
                  {isInstallable && (
                    <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-between">
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        متصفحك يدعم التثبيت المباشر الآن:
                      </div>
                      <button
                        onClick={handleInstallClick}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        تثبيت PWA الآن
                      </button>
                    </div>
                  )}

                  {installStatus === 'success' && (
                    <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      تم إرسال طلب التثبيت إلى ويندوز بنجاح!
                    </div>
                  )}

                  {/* Browser Manual Steps */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      كيفية التثبيت بعد فتح الرابط في المتصفح:
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Edge Guide */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                          عبر Microsoft Edge
                        </div>
                        <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside pr-1">
                          <li>انقر على أيقونة <strong>التطبيقات (Apps)</strong> في شريط العنوان أعلى Edge.</li>
                          <li>أو افتح القائمة <code className="text-[10px] bg-slate-100 dark:bg-[#1B3B59] px-1 rounded">...</code> واضغط <strong>Apps</strong> ثم <strong>Install this site as an app</strong>.</li>
                          <li>انقر على <strong>Install</strong> لإنشاء أيقونة ويندوز.</li>
                        </ol>
                      </div>

                      {/* Chrome Guide */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                          عبر Google Chrome
                        </div>
                        <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside pr-1">
                          <li>انقر على أيقونة <strong>تثبيت التطبيق (Install)</strong> في شريط العنوان يمين الشاشة.</li>
                          <li>أو اضغط القائمة <code className="text-[10px] bg-slate-100 dark:bg-[#1B3B59] px-1 rounded">...</code> ثم <strong>حفظ ومشاركة</strong> واضغط <strong>تثبيت التطبيق</strong>.</li>
                          <li>سيفتح التطبيق كنافذة سطح مكتب منفصلة.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'offline' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                إذا كنت ترغب في تشغيل الخادم بالكامل محلياً على جهازك بنظام Windows عبر سطر الأوامر (Command Prompt / PowerShell):
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>1. استنساخ المستودع (Git Clone):</span>
                    <button
                      onClick={() => handleCopy('git clone https://github.com/weykylauncher-ai/Store-Manager-Pro-AI-Studio.git', 'c1')}
                      className="text-sky-500 hover:text-sky-400 flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      {copiedCmd === 'c1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      نسخ
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto" dir="ltr">
                    git clone https://github.com/weykylauncher-ai/Store-Manager-Pro-AI-Studio.git
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>2. تثبيت الحزم (npm install):</span>
                    <button
                      onClick={() => handleCopy('npm install', 'c2')}
                      className="text-sky-500 hover:text-sky-400 flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      {copiedCmd === 'c2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      نسخ
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto" dir="ltr">
                    npm install
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>3. تشغيل خادم التطوير المحلي:</span>
                    <button
                      onClick={() => handleCopy('npm run dev', 'c3')}
                      className="text-sky-500 hover:text-sky-400 flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      {copiedCmd === 'c3' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      نسخ
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto" dir="ltr">
                    npm run dev
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1B3B59] bg-slate-50 dark:bg-[#07182B]/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            متوافق بنسبة 100% مع Windows 10 و Windows 11
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-[#1B3B59] hover:bg-slate-300 dark:hover:bg-[#234b70] text-slate-800 dark:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

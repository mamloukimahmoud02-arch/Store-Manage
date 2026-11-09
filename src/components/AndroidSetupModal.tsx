import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  CheckCircle, 
  X, 
  Terminal, 
  Sparkles, 
  Layers, 
  Check, 
  Copy, 
  ExternalLink,
  Code2
} from 'lucide-react';

interface AndroidSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidSetupModal: React.FC<AndroidSetupModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
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
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                مشروع Android Studio (Store Manager POS)
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-medium">
                  Kotlin + Jetpack Compose
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تطبيق كاشير ونقاط بيع متكامل جاهز للفتح والبناء المباشر في بيئة Android Studio
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Main Download Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 dark:from-[#082823] dark:via-[#092B38] dark:to-[#07182B] p-5 rounded-2xl border border-emerald-300 dark:border-emerald-700 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded font-mono">
                    GRADLE PROJECT ZIP
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Android API 24 - 35</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  حزمة مشروع Android Studio الكاملة (.zip)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md leading-relaxed">
                  تحتوي على إعدادات Gradle الكاملة، وموديل <code className="text-[10px] bg-white/70 dark:bg-black/30 px-1 rounded font-mono">:app</code>، وشاشات Jetpack Compose المكتوبة بلغة Kotlin، مع الأيقونات الرسمية وملفات الموارد.
                </p>
              </div>

              <a
                href="/StoreManagerPro-AndroidStudio.zip"
                download="StoreManagerPro-AndroidStudio.zip"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                تحميل المشروع (.zip)
              </a>
            </div>
          </div>

          {/* Quick Steps Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              خطوات التشغيل في Android Studio:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">تنزيل أو تحديد المجلد</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  حمّل ملف الـ ZIP وفك ضغطه، أو حدّد مجلد المشروع الحالي مباشرة.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">فتح في Android Studio</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  افتح <strong>Android Studio</strong> واضغط <strong>Open</strong> ثم اختر مجلد المشروع.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1B3B59] bg-white dark:bg-[#07182B]/40 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">بناء وتشغيل (Run)</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  سيكتمل <strong>Gradle Sync</strong> تلقائياً، اضغط زر <strong>Run ▶</strong> لتشغيله على المحاكي أو جهازك.
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Details */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#091D30] border border-slate-200 dark:border-[#1B3B59] space-y-2.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              مواصفات مشروع أندرويد المجهز:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>لغة البرمجة:</strong> Kotlin 2.0 + Jetpack Compose</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>نظام البناء:</strong> Gradle 8.9 + AGP 8.7.2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>حزمة التطبيق:</strong> com.storemanager.pos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>دعم الشاشات:</strong> الهواتف والأجهزة اللوحية (Tablet / POS)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>المظهر:</strong> The Pivot Palette (كحلي، تيل، فضي)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>الاتصال:</strong> يدعم الاتصال المباشر بالخادم المركزي عبر LAN/Cloud</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1B3B59] bg-slate-50 dark:bg-[#07182B]/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-500" />
            جاهز للاستيراد المباشر في كافة إصدارات Android Studio الحديثة
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

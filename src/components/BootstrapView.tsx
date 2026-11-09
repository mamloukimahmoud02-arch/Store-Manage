import React from 'react';
import { Monitor, Smartphone, Database, CheckCircle2, ShieldAlert, Cpu, HardDrive, Key, ArrowLeft, Sparkles, Download, ExternalLink } from 'lucide-react';
import { CANONICAL_SCHEMA_METRICS } from '../data/canonicalData';
import { getActiveAppUrl, downloadWindowsBatchInstaller } from '../utils/windowsInstaller';

interface BootstrapViewProps {
  onNavigateTab: (tab: 'products' | 'categories' | 'schema' | 'pos') => void;
  storeName: string;
  tenantName: string;
  onOpenWindowsSetup?: () => void;
  onOpenAndroidSetup?: () => void;
}

export const BootstrapView: React.FC<BootstrapViewProps> = ({
  onNavigateTab,
  storeName,
  tenantName,
  onOpenWindowsSetup,
  onOpenAndroidSetup,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner - Matching Compose StoreBootstrapScreen */}
      <div className="bg-white dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl relative overflow-hidden transition-colors duration-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#159EAA]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src="/assets/aistudio/Store_Manager_Pro_bdf64b53.png"
              alt="Store Manager Pro Official Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-slate-100 dark:bg-[#07182B] p-2 border border-slate-200 dark:border-[#1B3B59] shadow-sm dark:shadow-2xl dark:shadow-[#07182B] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d9488] dark:text-[#159EAA] bg-[#159EAA]/10 px-2.5 py-0.5 rounded-full border border-[#159EAA]/25 dark:border-[#159EAA]/30">
                  الهوية البصرية المعتمدة (The Pivot Module v1.0)
                </span>
                <span className="text-xs font-mono-brand text-slate-500 dark:text-[#C5CDD5]">
                  3×3 Grid • Navy · Teal · Silver · White
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-brand font-black text-slate-900 dark:text-white tracking-tight">
                STORE MANAGER <span className="text-[#0d9488] dark:text-[#159EAA] font-bold">PRO</span>
              </h1>
              <p className="text-slate-600 dark:text-[#C5CDD5] text-sm mt-1 max-w-2xl leading-relaxed">
                تشغيل المتاجر المتعددة كنظام موحد — المخزون، المبيعات، الصلاحيات والتقارير في طبقة تشغيلية مركزية واحدة.
                (الأساس المشترك للتشغيل المحلي الموثوق مع حماية التناغم وعزل المستأجر).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            {onOpenWindowsSetup ? (
              <button
                onClick={onOpenWindowsSetup}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-200 text-xs font-bold shadow-sm hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5 text-sky-500" />
                تثبيت على Windows (Desktop Host)
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#0E2942] border border-slate-200 dark:border-[#1B3B59] text-slate-800 dark:text-white text-xs font-bold shadow-sm">
                <Monitor className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#159EAA]" />
                Windows Desktop (Host)
              </span>
            )}
            {onOpenAndroidSetup ? (
              <button
                onClick={onOpenAndroidSetup}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                Android Studio (POS Client)
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#159EAA]/10 dark:bg-[#159EAA]/15 border border-[#159EAA]/30 text-[#0d9488] dark:text-[#159EAA] text-xs font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                Android POS (Client)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Windows Installation Direct Action Banner */}
      <div className="bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-indigo-500/10 dark:from-[#0B2540] dark:via-[#092238] dark:to-[#0A1D33] border border-sky-300 dark:border-[#1E456B] rounded-2xl p-5 shadow-sm transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 text-sky-600 dark:bg-sky-500/25 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  تثبيت Store Manager Pro على نظام ويندوز 10 / 11
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold">
                  نسخة سطح المكتب الأصلية
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                للتشغيل السريع، نزّل مثبت ويندوز المباشر لإنشاء أيقونة فورية على سطح المكتب وقائمة Start، أو افتح التطبيق في نافذة مستقلة خارج المنصة للتثبيت عبر المتصفح (PWA).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto">
            <a
              href="/StoreManagerPro-Setup.exe"
              download="StoreManagerPro-Setup.exe"
              className="flex-1 lg:flex-none justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              تحميل المثبت (StoreManagerPro-Setup.exe)
            </a>

            <a
              href="/StoreManagerPro.exe"
              download="StoreManagerPro.exe"
              className="flex-1 lg:flex-none justify-center px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-600/20 hover:shadow-sky-600/35 transition-all cursor-pointer"
            >
              <Monitor className="w-4 h-4" />
              المشغل المحمول (.exe)
            </a>

            {onOpenAndroidSetup && (
              <button
                onClick={onOpenAndroidSetup}
                className="flex-1 lg:flex-none justify-center px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/70 text-emerald-800 dark:text-emerald-200 font-bold text-xs transition-colors border border-emerald-300 dark:border-emerald-800 cursor-pointer flex items-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                مشروع Android Studio (.zip)
              </button>
            )}

            {onOpenWindowsSetup && (
              <button
                onClick={onOpenWindowsSetup}
                className="flex-1 lg:flex-none justify-center px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#13324F] hover:bg-slate-100 dark:hover:bg-[#1A4269] text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-[#224C77] cursor-pointer"
              >
                خيارات إضافية
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Operational Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Card 1 */}
        <div className="bg-white dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-2xl p-5 shadow-sm transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#159EAA] animate-pulse shadow-md shadow-[#159EAA]/50" />
            <div>
              <p className="text-xs text-slate-500 dark:text-[#C5CDD5] font-medium">حالة التشغيل الأساسية</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">نواة مشتركة تعمل بنجاح</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-[#1B3B59]">
            تم التحقق من محرك SQLite وتهيئة سياق المتجر
          </p>
        </div>

        {/* Status Card 2 */}
        <div className="bg-white dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-2xl p-5 shadow-sm transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-[#C5CDD5] shadow-sm" />
            <div>
              <p className="text-xs text-slate-500 dark:text-[#C5CDD5] font-medium">نمط التخزين والمتانة</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{CANONICAL_SCHEMA_METRICS.durabilityMode}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-[#1B3B59]">
            أمان مالي كامل بحماية Transactions & Triggers
          </p>
        </div>

        {/* Status Card 3 */}
        <div className="bg-white dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-2xl p-5 shadow-sm transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#159EAA] shadow-sm shadow-[#159EAA]/40" />
            <div>
              <p className="text-xs text-slate-500 dark:text-[#C5CDD5] font-medium">مخطط قاعدة البيانات</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Schema Version 3 (56 جداول)</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-[#1B3B59]">
            109 فهارس صريحة • 188 مشغلاً نشطاً
          </p>
        </div>

        {/* Status Card 4 */}
        <div className="bg-white dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-2xl p-5 shadow-sm transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-sm" />
            <div>
              <p className="text-xs text-slate-500 dark:text-[#C5CDD5] font-medium">حالة فحص المخطط</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{CANONICAL_SCHEMA_METRICS.schemaVerificationStatus}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-[#1B3B59]">
            اجتياز كامل الفحوصات في verify_canonical_schema
          </p>
        </div>
      </div>

      {/* System Specifications Card */}
      <div className="bg-white dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-2xl p-6 shadow-sm transition-colors duration-200">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#159EAA]/15 text-[#0d9488] dark:text-[#159EAA] flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">مواصفات البيئة البرمجية القياسية (Baseline Architecture Specs)</h2>
              <p className="text-xs text-slate-500 dark:text-[#C5CDD5]">القرارات المعمارية المعتمدة وفق كود المخطط والمستودع</p>
            </div>
          </div>
          <span className="text-xs font-mono-brand px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#07182B] text-slate-700 dark:text-[#C5CDD5] border border-slate-200 dark:border-[#1B3B59]">
            PRAGMA user_version = {CANONICAL_SCHEMA_METRICS.version}
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-[#1B3B59] text-sm">
          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">الإصدار المعماري المعتمد</span>
            <span className="font-semibold text-slate-900 dark:text-white">{CANONICAL_SCHEMA_METRICS.architectureVersion}</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">المنصة المستهدفة</span>
            <span className="font-semibold text-slate-900 dark:text-white">{CANONICAL_SCHEMA_METRICS.targetPlatform}</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">دور الجهاز في الشبكة</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">مضيف مركزي محلي والكاتب الوحيد لقاعدة البيانات (Windows Host)</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">المؤسسة والمتجر النشط</span>
            <span className="font-semibold text-[#0d9488] dark:text-[#159EAA]">{tenantName} — {storeName}</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">العملة واللغة</span>
            <span className="font-semibold text-slate-900 dark:text-white">DZD (الدينار الجزائري) | العربية (RTL)</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">تمثيل القيم النقدية والكميات</span>
            <span className="font-mono-brand text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-[#07182B] px-2.5 py-1 rounded border border-slate-200 dark:border-[#1B3B59]">
              INTEGER Ticks & Centimes (No Float / Double)
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">عزل المؤسسات وعالمية الـ SKU</span>
            <span className="font-mono-brand text-xs font-semibold text-[#0d9488] dark:text-[#159EAA] bg-slate-100 dark:bg-[#07182B] px-2.5 py-1 rounded border border-[#159EAA]/30">
              UNIQUE(tenant_id, sku) & CHECK(sku = UPPER(TRIM(sku)))
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">تشفير كلمات المرور</span>
            <span className="font-mono-brand text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-[#07182B] px-2.5 py-1 rounded border border-slate-200 dark:border-[#1B3B59]">
              Argon2id v13 (m=19456 KiB, t=2, p=1) + Salt 16B
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-[#C5CDD5]">الهوية البصرية المعتمدة (Visual Identity)</span>
            <span className="text-xs font-semibold text-[#0d9488] dark:text-[#159EAA] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#159EAA]" />
              The Pivot Module (Deep Navy · Corporate Teal · Metallic Silver · Pure White)
            </span>
          </div>
        </div>

        {/* Visual Identity Showcase Card */}
        <div className="mt-5 p-5 rounded-xl bg-slate-50 dark:bg-[#07182B] border border-slate-200 dark:border-[#1B3B59] flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/Store_Manager_Pro_bdf64b53.png"
              alt="Store Manager Pro Logo"
              className="w-14 h-14 rounded-xl object-contain bg-white dark:bg-[#07182B] p-1.5 border border-slate-200 dark:border-[#1B3B59] shadow-sm shrink-0"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white font-brand">THE PIVOT MODULE — 3×3 UNIT GRID</p>
              <p className="text-xs text-slate-600 dark:text-[#C5CDD5] mt-0.5">
                "Flat, solid, deliberate. Navy carries authority (60%). Teal is used sparingly (10%) to signal point of focus. Silver (15%) and white (15%) provide calm structure."
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono-brand px-2.5 py-1 rounded bg-[#07182B] text-white border border-[#1B3B59]">
              Deep Navy #07182B
            </span>
            <span className="text-[10px] font-mono-brand px-2.5 py-1 rounded bg-[#159EAA] text-white font-bold shadow-sm shadow-[#159EAA]/30">
              Teal #159EAA
            </span>
            <span className="text-[10px] font-mono-brand px-2.5 py-1 rounded bg-[#C5CDD5] text-[#07182B] font-bold">
              Silver #C5CDD5
            </span>
            <span className="text-[10px] font-mono-brand px-2.5 py-1 rounded bg-white text-[#07182B] font-bold border border-slate-200 dark:border-transparent">
              White #FFFFFF
            </span>
          </div>
        </div>

        {/* Quick Launch Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#1B3B59] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateTab('products')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#159EAA] hover:bg-[#128B96] text-white font-bold text-xs transition-all shadow-md shadow-[#159EAA]/25 cursor-pointer"
          >
            الانتقال إلى إدارة المنتجات
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigateTab('categories')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white dark:bg-[#0E2942] hover:bg-slate-100 dark:hover:bg-[#13385a] text-slate-700 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white font-bold text-xs transition-all border border-slate-200 dark:border-[#1B3B59] cursor-pointer"
          >
            إدارة الفئات الهرمية
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigateTab('schema')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white dark:bg-[#0E2942] hover:bg-slate-100 dark:hover:bg-[#13385a] text-slate-700 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white font-bold text-xs transition-all border border-slate-200 dark:border-[#1B3B59] cursor-pointer"
          >
            استعراض المخطط وفحص SQLite
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {onOpenWindowsSetup && (
            <button
              onClick={onOpenWindowsSetup}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/80 text-sky-700 dark:text-sky-300 font-bold text-xs transition-all border border-sky-300 dark:border-sky-800 shadow-sm cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-sky-500" />
              تثبيت نسخة Windows
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

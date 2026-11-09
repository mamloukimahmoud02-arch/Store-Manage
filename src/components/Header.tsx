import React from 'react';
import { Store, ShieldCheck, Database, Layers, Package, FolderTree, Monitor, Smartphone, Terminal, LogOut, Sun, Moon } from 'lucide-react';
import { UserSession } from '../types/store';

interface HeaderProps {
  currentTab: 'bootstrap' | 'products' | 'categories' | 'schema' | 'pos';
  setCurrentTab: (tab: 'bootstrap' | 'products' | 'categories' | 'schema' | 'pos') => void;
  session: UserSession | null;
  onLogout: () => void;
  onResetSetup: () => void;
  tenantName: string;
  storeName: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenWindowsSetup?: () => void;
  onOpenAndroidSetup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  session,
  onLogout,
  onResetSetup,
  tenantName,
  storeName,
  theme,
  onToggleTheme,
  onOpenWindowsSetup,
  onOpenAndroidSetup,
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-[#1B3B59] bg-white/95 dark:bg-[#07182B]/95 sticky top-0 z-40 backdrop-blur transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Store Context */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative group">
              <img
                src="/assets/aistudio/Store_Manager_Pro_bdf64b53.png"
                alt="Store Manager Pro Logo"
                className="w-11 h-11 rounded-xl object-contain bg-slate-100 dark:bg-[#07182B] p-1 border border-slate-200 dark:border-[#1B3B59] shadow-sm dark:shadow-lg dark:shadow-[#07182B]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand font-black text-lg text-slate-900 dark:text-white tracking-wide">STORE MANAGER</span>
                <span className="font-brand font-bold text-xs tracking-widest text-[#0d9488] dark:text-[#159EAA]">PRO</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#159EAA]/10 dark:bg-[#159EAA]/15 text-[#0d9488] dark:text-[#159EAA] font-mono-brand border border-[#159EAA]/20 dark:border-[#159EAA]/30">
                  v3.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#C5CDD5] flex items-center gap-1.5">
                <span className="font-medium text-slate-800 dark:text-white">{storeName}</span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="text-slate-600 dark:text-slate-300">{tenantName}</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-[#0B2238] p-1.5 rounded-xl border border-slate-200 dark:border-[#1B3B59]">
            <button
              onClick={() => setCurrentTab('bootstrap')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'bootstrap'
                  ? 'bg-[#159EAA] text-white shadow-md shadow-[#159EAA]/25'
                  : 'text-slate-600 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0E2942]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              نظرة عامة والتشغيل
            </button>

            <button
              onClick={() => setCurrentTab('products')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'products'
                  ? 'bg-[#159EAA] text-white shadow-md shadow-[#159EAA]/25'
                  : 'text-slate-600 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0E2942]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              المنتجات والمتغيرات
            </button>

            <button
              onClick={() => setCurrentTab('categories')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'categories'
                  ? 'bg-[#159EAA] text-white shadow-md shadow-[#159EAA]/25'
                  : 'text-slate-600 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0E2942]'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              فئات المنتجات
            </button>

            <button
              onClick={() => setCurrentTab('schema')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'schema'
                  ? 'bg-[#159EAA] text-white shadow-md shadow-[#159EAA]/25'
                  : 'text-slate-600 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0E2942]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              المخطط وقاعدة البيانات
            </button>

            <button
              onClick={() => setCurrentTab('pos')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'pos'
                  ? 'bg-[#159EAA] text-white shadow-md shadow-[#159EAA]/25'
                  : 'text-slate-600 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#0E2942]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              واجهة الكاشير (POS)
            </button>
          </nav>

          {/* User & Theme Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Windows Install Action */}
            {onOpenWindowsSetup && (
              <button
                onClick={onOpenWindowsSetup}
                title="تثبيت Store Manager Pro على نظام ويندوز (Windows Desktop App)"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-all text-xs font-bold cursor-pointer shadow-sm hover:shadow"
              >
                <Monitor className="w-4 h-4 text-sky-500" />
                <span className="hidden md:inline">Windows (.exe)</span>
                <span className="md:hidden">Win</span>
              </button>
            )}

            {onOpenAndroidSetup && (
              <button
                onClick={onOpenAndroidSetup}
                title="تجهيز وتشغيل Store Manager Pro على Android Studio"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all text-xs font-bold cursor-pointer shadow-sm hover:shadow"
              >
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <span className="hidden md:inline">Android Studio</span>
                <span className="md:hidden">Android</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح (Light Mode)' : 'التبديل إلى الوضع الداكن (Dark Mode)'}
              aria-label="تبديل الوضع الفاتح أو الداكن"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] text-slate-700 dark:text-[#C5CDD5] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#0E2942] transition-all text-xs font-semibold cursor-pointer shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">فاتح</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">داكن</span>
                </>
              )}
            </button>

            {/* User Session */}
            {session ? (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#0B2238] border border-slate-200 dark:border-[#1B3B59] rounded-xl px-3 py-1.5 shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-[#159EAA]/15 text-[#0d9488] dark:text-[#159EAA] flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{session.fullName}</p>
                  <p className="text-[10px] text-[#0d9488] dark:text-[#159EAA] font-medium">مدير النظام (Administrator)</p>
                </div>
                <button
                  onClick={onLogout}
                  title="تسجيل الخروج"
                  className="mr-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onResetSetup}
                className="text-xs bg-[#159EAA] hover:bg-[#128B96] text-white font-bold px-3.5 py-2 rounded-xl transition-colors shadow-md shadow-[#159EAA]/20"
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-200 dark:border-[#1B3B59]">
          <button
            onClick={() => setCurrentTab('bootstrap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentTab === 'bootstrap'
                ? 'bg-[#159EAA] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#C5CDD5] hover:bg-slate-200 dark:hover:bg-[#0E2942]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            التشغيل
          </button>
          <button
            onClick={() => setCurrentTab('products')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentTab === 'products'
                ? 'bg-[#159EAA] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#C5CDD5] hover:bg-slate-200 dark:hover:bg-[#0E2942]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            المنتجات
          </button>
          <button
            onClick={() => setCurrentTab('categories')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentTab === 'categories'
                ? 'bg-[#159EAA] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#C5CDD5] hover:bg-slate-200 dark:hover:bg-[#0E2942]'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            الفئات
          </button>
          <button
            onClick={() => setCurrentTab('schema')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentTab === 'schema'
                ? 'bg-[#159EAA] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#C5CDD5] hover:bg-slate-200 dark:hover:bg-[#0E2942]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            المخطط
          </button>
          <button
            onClick={() => setCurrentTab('pos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentTab === 'pos'
                ? 'bg-[#159EAA] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#C5CDD5] hover:bg-slate-200 dark:hover:bg-[#0E2942]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            الكاشير
          </button>
        </div>
      </div>
    </header>
  );
};


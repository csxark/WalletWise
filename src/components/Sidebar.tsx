import React from 'react';
import { BarChart3, List, User, Wallet, Moon, Sun, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { isDark, toggleTheme, isLoaded } = useTheme();
  const { user, signOut } = useAuth();
  const { profile, isPremium } = useProfile();
  
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', name: 'Transactions', icon: List },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`w-64 h-full flex flex-col border-r ${
      isDark 
        ? 'bg-slate-900/95 border-slate-700/50' 
        : 'bg-white/95 border-gray-200/50'
    } backdrop-blur-md`}>
      {/* Logo and Brand */}
      {/* <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-yellow-500 via-yellow-500 to-amber-500 shadow-yellow-500/25 group-hover:shadow-yellow-500/40' 
                : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/25 group-hover:shadow-blue-500/40'
            }`}>
              <Wallet className="h-5 w-5 sm:h-7 sm:w-7 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className={`text-lg sm:text-xl font-bold bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200' 
                : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
            }`}>
              WalletWise
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
              Finance Management
            </p>
          </div>
        </div>
      </div> */}

      {/* User Info */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg sm:rounded-xl flex items-center justify-center">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {profile?.full_name || user?.email?.split('@')[0]}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </div>
            <div className={`flex items-center space-x-1 mt-1 ${
              isDark ? 'text-yellow-400' : 'text-blue-600'
            }`}>
              <Wallet className="h-3 w-3" />
              <span className="text-xs font-semibold">
                {isPremium ? 'Premium' : 'Standard'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full group relative flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? isDark
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : isDark
                    ? 'text-gray-300 hover:text-yellow-300 hover:bg-slate-800/80'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/80'
              }`}
            >
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
              }`} />
              <span className="font-medium">{item.name}</span>
              {activeTab === item.id && (
                <div className={`absolute inset-0 rounded-lg sm:rounded-xl animate-pulse ${
                  isDark 
                    ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20' 
                    : 'bg-gradient-to-r from-blue-400/20 to-blue-500/20'
                }`} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-slate-700 space-y-1 sm:space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          disabled={!isLoaded}
          className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
            isLoaded 
              ? isDark
                ? 'text-gray-300 hover:bg-slate-800 hover:text-yellow-300'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              : 'opacity-50 cursor-not-allowed'
          }`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="relative w-4 h-4 sm:w-5 sm:h-5">
            {isLoaded ? (
              <>
                <Sun className={`absolute inset-0 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                  isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <Moon className={`absolute inset-0 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                }`} />
              </>
            ) : (
              <div className="h-4 w-4 sm:h-5 sm:w-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            )}
          </div>
          <span className="text-sm font-medium">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        {/* Settings */}
        {/* <button 
          className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
            isDark
              ? 'text-gray-300 hover:bg-slate-800 hover:text-yellow-300'
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button> */}

        {/* Sign Out */}
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
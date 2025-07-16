import React from 'react';
import { PlusCircle, Wallet, Moon, Sun, TrendingUp, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddExpense: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onAddExpense, 
  isSidebarOpen, 
  onToggleSidebar 
}) => {
  const { isDark, toggleTheme, isLoaded } = useTheme();

  return (
    <header className={`backdrop-blur-md shadow-lg border-b sticky top-0 z-50 h-16 sm:h-20 ${
      isDark 
        ? 'bg-slate-900/95 border-slate-700/50' 
        : 'bg-white/95 border-gray-200/50'
    }`}>
      <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left Section - Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative group">
              <div className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-yellow-500 via-yellow-500 to-amber-500 shadow-yellow-500/25 group-hover:shadow-yellow-500/40' 
                  : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/25 group-hover:shadow-blue-500/40'
              }`}>
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-3 w-3 sm:h-4 sm:w-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                <TrendingUp className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200' 
                  : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
              }`}>
                WalletWise
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase hidden sm:block">
                Finance Management
              </p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              disabled={!isLoaded}
              className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 group hover:scale-110 ${
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
            </button>

            {/* Add Transaction Button - All Devices */}
            <button
              onClick={onAddExpense}
              className={`group flex items-center space-x-1 sm:space-x-2 lg:space-x-3 text-white px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold shadow-xl hover:scale-105 relative overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-700 hover:from-yellow-500 hover:via-yellow-600 hover:to-amber-700 shadow-yellow-300/30 hover:shadow-yellow-500/50'
                  : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/30 hover:shadow-blue-500/50'
              }`}
            >
              <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 transition-transform duration-300 group-hover:rotate-180" />
              <span className="font-semibold text-xs sm:text-sm lg:text-base">Add</span>
              <span className="hidden sm:inline font-semibold text-xs sm:text-sm lg:text-base">Transaction</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            {/* Sidebar Toggle - Moved to Right */}
            <button
              onClick={onToggleSidebar}
              className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'text-gray-300 hover:bg-slate-800 hover:text-yellow-300'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              {isSidebarOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
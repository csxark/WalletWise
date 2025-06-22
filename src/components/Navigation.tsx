import React from 'react';
import { BarChart3, PlusCircle, List, Crown, Moon, Sun, TrendingUp,} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddExpense: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onAddExpense }) => {
  const { isDark, toggleTheme, isLoaded } = useTheme();
  
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', name: 'Transactions', icon: List },
  ];

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-blue-200/50 dark:border-amber-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="h-12 w-12 
                  bg-gradient-to-br from-blue-700 via-sky-700 to-blue-600
                  dark:from-amber-400 dark:via-yellow-500 dark:to-amber-500
                  rounded-2xl flex items-center justify-center shadow-xl 
                  shadow-blue-700/25 group-hover:shadow-blue-700/35
                  dark:shadow-amber-500/25 dark:group-hover:shadow-amber-500/40
                  transition-all duration-300">
                  <Crown className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 
                  bg-gradient-to-r from-emerald-400 to-green-500
                  rounded-full flex items-center justify-center animate-pulse">
                  <TrendingUp className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold 
                  bg-gradient-to-r from-blue-700 via-sky-700 to-blue-600
                  dark:from-amber-400 dark:via-yellow-400 dark:to-amber-500
                  bg-clip-text text-transparent">
                  WalletWise
                </h1>
                <p className="text-s text-blue-500 dark:text-amber-300 font-medium tracking-wide uppercase">
                  Finance Management
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30 scale-105 dark:from-amber-500 dark:to-yellow-600 dark:shadow-amber-500/30'
                        : 'text-blue-700 dark:text-amber-300 hover:text-blue-900 dark:hover:text-amber-400 hover:bg-blue-50/80 dark:hover:bg-slate-800/80 hover:scale-105'
                    }`}
                  >
                    <Icon className={`h-5 w-5 transition-transform duration-300 ${
                      activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className="font-bold text-xl/2">{item.name}</span>
                    {activeTab === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-sky-500/20 rounded-2xl animate-pulse dark:from-amber-400/20 dark:to-yellow-500/20" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <div className="relative">
                <button
                  onClick={toggleTheme}
                  disabled={!isLoaded}
                  className={`relative p-3 rounded-2xl transition-all duration-300 group ${
                    isLoaded 
                      ? 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 hover:scale-110' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <div className="relative w-5 h-5">
                    {isLoaded ? (
                      <>
                        <Sun className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                          isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                        }`} />
                        <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                        }`} />
                      </>
                    ) : (
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                    )}
                  </div>
                </button>
              </div>

              {/* Settings Button */}
              {/* <button 
                className="p-3 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 hover:scale-110"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button> */}

              {/* Profile Button */}
              {/* <button 
                className="p-3 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 hover:scale-110"
                title="Profile"
              >
                <User className="h-5 w-5" />
              </button> */}

              {/* Add Transaction Button */}
              <button
                onClick={onAddExpense}
                className="group flex items-center space-x-3 bg-gradient-to-r from-blue-700 via-sky-700 to-blue-600
                  hover:from-blue-800 hover:via-sky-800 hover:to-blue-700
                  text-white px-8 py-3.5 rounded-2xl transition-all duration-300 font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 relative overflow-hidden
                  dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700 dark:hover:from-amber-700 dark:hover:via-yellow-700 dark:hover:to-amber-800 dark:shadow-amber-500/30 dark:hover:shadow-amber-500/50"
              >
                <PlusCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                <span className="font-semibold">Add Transaction</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              disabled={!isLoaded}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isLoaded 
                  ? 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="relative w-5 h-5">
                {isLoaded ? (
                  isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
                ) : (
                  <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                )}
              </div>
            </button>
            
            {/* Mobile Menu */}
            {/* <button className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800">
              <Menu className="h-6 w-6" />
            </button> */} 
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <nav className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30 dark:from-amber-500 dark:to-yellow-600 dark:shadow-amber-500/30'
                      : 'text-blue-700 dark:text-amber-300 hover:text-blue-900 dark:hover:text-amber-400 hover:bg-blue-50/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Mobile Add Button */}
          <button
            onClick={onAddExpense}
            className="w-full mt-3 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-700 via-sky-700 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30
              dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700 dark:shadow-amber-500/30"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
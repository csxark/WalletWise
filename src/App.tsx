import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import UserProfile from './components/UserProfile';
import AddExpense from './components/AddExpense';
import Auth from './components/Auth';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';

function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile
  const { isDark } = useTheme();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className="text-center px-4">
          <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-3xl flex items-center justify-center shadow-xl mx-auto mb-4 ${
            isDark
              ? 'bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-700 shadow-yellow-500/25'
              : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/25'
          }`}>
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Loading WalletWise</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Preparing your financial experience...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showHomePage) {
      return (
        <HomePage 
          onSignIn={() => setShowHomePage(false)}
          onSignUp={() => setShowHomePage(false)}
        />
      );
    }
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <ExpenseList />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Navigation Bar - Always visible */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddExpense={() => setIsAddExpenseOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)]">
        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto transition-transform duration-300 ease-in-out lg:transition-all ${
          isSidebarOpen 
            ? 'translate-x-0 lg:w-64' 
            : '-translate-x-full lg:translate-x-0 lg:w-0'
        } lg:overflow-hidden`}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      <AddExpense
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />
    </div>
  );
}

export default App;
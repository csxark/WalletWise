import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import { useTheme } from './hooks/useTheme';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const { isDark } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <ExpenseList />;
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
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddExpense={() => setIsAddExpenseOpen(true)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      <AddExpense
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
      />
    </div>
  );
}

export default App;
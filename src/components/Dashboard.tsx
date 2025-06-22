import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Crown, Gem, Star, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useExpenses } from '../hooks/useExpenses';

const Dashboard = () => {
  const { getCurrentMonthData, getMonthlyData, getCategoryData } = useExpenses();
  const currentMonth = getCurrentMonthData();
  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();

  const savingsRate = currentMonth.income > 0 ? (currentMonth.savings / currentMonth.income) * 100 : 0;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
            Your premium financial overview
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 mt-1">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-semibold">Premium Account</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Income</p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                ₹{currentMonth.income.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+12.5% from last month</span>
              </div>
            </div>
            <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Expenses</p>
              <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-2">
                ₹{currentMonth.expenses.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingDown className="h-3 w-3 text-rose-500" />
                <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">-3.2% from last month</span>
              </div>
            </div>
            <div className="h-14 w-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/25">
              <TrendingDown className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Net Savings</p>
              <p className={`text-3xl font-bold mt-2 ${currentMonth.savings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                ₹{currentMonth.savings.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <Gem className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Building wealth</span>
              </div>
            </div>
            <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <PiggyBank className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Savings Rate</p>
              <p className={`text-3xl font-bold mt-2 ${savingsRate >= 20 ? 'text-amber-600 dark:text-amber-400' : savingsRate >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {savingsRate.toFixed(1)}%
              </p>
              <div className="flex items-center space-x-1 mt-2">
                <Award className="h-3 w-3 text-amber-500" />
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {savingsRate >= 20 ? 'Excellent!' : savingsRate >= 10 ? 'Good progress' : 'Needs improvement'}
                </span>
              </div>
            </div>
            <div className="h-14 w-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Star className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Trends</h3>
            <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
              <Crown className="h-4 w-4" />
              <span className="text-sm font-semibold">Premium Analytics</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis dataKey="month" stroke="#64748b" className="dark:stroke-slate-400" fontSize={12} />
                <YAxis stroke="#64748b" className="dark:stroke-slate-400" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(8px)'
                  }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
                />
                <Bar dataKey="income" fill="url(#incomeGradient)" name="Income" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="url(#expenseGradient)" name="Expenses" radius={[6, 6, 0, 0]} />
                <Bar dataKey="savings" fill="url(#savingsGradient)" name="Savings" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expense Categories</h3>
            <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
              <Gem className="h-4 w-4" />
              <span className="text-sm font-semibold">Luxury Insights</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    backdropFilter: 'blur(8px)'
                  }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Category Breakdown</h3>
          <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">Detailed Analysis</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-5 h-5 rounded-full shadow-sm"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="font-semibold text-gray-900 dark:text-white">{category.name}</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-lg">₹{category.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
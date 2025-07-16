import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Wallet, Gem, Star, Award, ChevronDown, Calendar, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Label, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useExpenses } from '../hooks/useExpenses';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { format, parseISO, startOfMonth, endOfMonth, subMonths } from 'date-fns';

const Dashboard = () => {
  const { getMonthData, getMonthlyData, getCategoryData, getAvailableMonths, expenses } = useExpenses();
  const { user, signOut } = useAuth();
  const { isDark } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'MMM yyyy'));
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const availableMonths = getAvailableMonths();
  const currentMonthData = getMonthData(selectedMonth);
  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData(selectedMonth);

  const savingsRate = currentMonthData.income > 0 ? (currentMonthData.savings / currentMonthData.income) * 100 : 0;

  // Calculate available balance (running total)
  const availableBalance = useMemo(() => {
    const sortedExpenses = [...expenses].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let runningBalance = 0;
    sortedExpenses.forEach(expense => {
      if (expense.type === 'income') {
        runningBalance += expense.amount;
      } else {
        runningBalance -= expense.amount;
      }
    });

    return runningBalance;
  }, [expenses]);

  // Calculate balance up to selected month
  const selectedMonthBalance = useMemo(() => {
    const selectedDate = new Date(selectedMonth);
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return expenseDate <= new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    });

    let balance = 0;
    filteredExpenses.forEach(expense => {
      if (expense.type === 'income') {
        balance += expense.amount;
      } else {
        balance -= expense.amount;
      }
    });

    return balance;
  }, [expenses, selectedMonth]);

  function hasBarChartData(monthlyData = []) {
    if (!monthlyData?.length) return false;
    return monthlyData.some(d =>
      (d.income && d.income !== 0) ||
      (d.expenses && d.expenses !== 0) ||
      (d.savings && d.savings !== 0)
    );
  }

  // Enhanced balance calculations
  const balanceAnalytics = useMemo(() => {
    // Parse the selected month to get the correct date
    const selectedDate = new Date(selectedMonth + ' 01'); // Add day to make it a valid date
    const previousMonth = subMonths(selectedDate, 1);
    const previousMonthKey = format(previousMonth, 'MMM yyyy');

    const selectedMonthExpenses = expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return expenseDate >= startOfMonth(selectedDate) && expenseDate <= endOfMonth(selectedDate);
    });

    const previousMonthExpenses = expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return expenseDate >= startOfMonth(previousMonth) && expenseDate <= endOfMonth(previousMonth);
    });

    const selectedIncome = selectedMonthExpenses
      .filter(exp => exp.type === 'income')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const selectedExpense = selectedMonthExpenses
      .filter(exp => exp.type === 'expense')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const previousMonthIncome = previousMonthExpenses
      .filter(exp => exp.type === 'income')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const previousMonthExpense = previousMonthExpenses
      .filter(exp => exp.type === 'expense')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const incomeChange = previousMonthIncome > 0 ? ((selectedIncome - previousMonthIncome) / previousMonthIncome) * 100 : 0;
    const expenseChange = previousMonthExpense > 0 ? ((selectedExpense - previousMonthExpense) / previousMonthExpense) * 100 : 0;

    // Calculate daily average for selected month
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const dailyAvgIncome = selectedIncome / daysInMonth;
    const dailyAvgExpense = selectedExpense / daysInMonth;

    // Calculate spending by category for selected month
    const categorySpending = selectedMonthExpenses
      .filter(exp => exp.type === 'expense')
      .reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {} as Record<string, number>);

    const topCategory = Object.entries(categorySpending)
      .sort(([, a], [, b]) => b - a)[0];

    return {
      incomeChange,
      expenseChange,
      dailyAvgIncome,
      dailyAvgExpense,
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      totalTransactions: selectedMonthExpenses.length,
      previousMonthKey
    };
  }, [expenses, selectedMonth]);

  return (
    <div className="min-h-screen w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-clip-text text-transparent ${isDark
            ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
            : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
            }`}>
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 font-medium text-xs sm:text-sm lg:text-base">
            Your financial overview
          </p>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-9">
          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className={`flex items-center space-x-2 border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 transition-colors shadow-sm text-xs sm:text-sm lg:text-base ${isDark
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                }`}
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400" />
              <span className="font-medium">{selectedMonth}</span>
              <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400 transition-transform ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMonthDropdownOpen && (
              <div className={`absolute mt-2 z-10 max-h-60 overflow-y-auto
    w-56 sm:w-48 left-0 sm:right-0 sm:left-auto
    border rounded-lg sm:rounded-xl shadow-xl
    ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}
  `}>
                {availableMonths.length > 0 ? (
                  availableMonths.map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setIsMonthDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 transition-colors first:rounded-t-lg first:sm:rounded-t-xl last:rounded-b-lg last:sm:rounded-b-xl text-xs sm:text-sm ${selectedMonth === month
                        ? isDark
                          ? 'bg-yellow-900/20 text-yellow-400 font-semibold'
                          : 'bg-blue-50 text-blue-600 font-semibold'
                        : isDark
                          ? 'text-white hover:bg-slate-700'
                          : 'text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      {month}
                    </button>
                  ))
                ) : (
                  <div className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    No data available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-3 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Income</p>
              <p className="text-sm sm:text-lg lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 sm:mt-2">
                ₹{currentMonthData.income.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-1 sm:mt-2">
                <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{selectedMonth}</span>
              </div>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-3 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Expenses</p>
              <p className="text-sm sm:text-lg lg:text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1 sm:mt-2">
                ₹{currentMonthData.expenses.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-1 sm:mt-2">
                <TrendingDown className="h-2 w-2 sm:h-3 sm:w-3 text-rose-500" />
                <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">{selectedMonth}</span>
              </div>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/25">
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-3 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Net Savings</p>
              <p className={`text-sm sm:text-lg lg:text-2xl font-bold mt-1 sm:mt-2 ${currentMonthData.savings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                ₹{currentMonthData.savings.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-1 sm:mt-2">
                <Gem className="h-2 w-2 sm:h-3 sm:w-3 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Building wealth</span>
              </div>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-3 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Savings Rate</p>
              <p className={`text-sm sm:text-lg lg:text-2xl font-bold mt-1 sm:mt-2 ${savingsRate >= 20
                ? isDark ? 'text-yellow-400' : 'text-orange-600'
                : savingsRate >= 10
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-rose-600 dark:text-rose-400'
                }`}>
                {savingsRate.toFixed(1)}%
              </p>
              <div className="flex items-center space-x-1 mt-1 sm:mt-2">
                <Award className={`h-2 w-2 sm:h-3 sm:w-3 ${isDark ? 'text-yellow-400' : 'text-orange-500'}`} />
                <span className={`text-xs font-medium ${isDark ? 'text-yellow-400' : 'text-orange-600'}`}>
                  {savingsRate >= 20 ? 'Excellent!' : savingsRate >= 10 ? 'Good progress' : 'Needs improvement'}
                </span>
              </div>
            </div>
            <div className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg ${isDark
              ? 'bg-gradient-to-br from-yellow-500 to-amber-600 shadow-yellow-500/25'
              : 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/25'
              }`}>
              <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Available Balance Card */}
        <div className={`col-span-2 lg:col-span-1 rounded-xl sm:rounded-2xl shadow-xl border p-3 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Available Balance</p>
              <p className={`text-sm sm:text-lg lg:text-2xl font-bold mt-1 sm:mt-2 ${availableBalance >= 0 ? 'text-purple-500 dark:text-purple-400' : 'text-rose-600 dark:text-rose-400'}`}>
                ₹{availableBalance.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center space-x-1 mt-1 sm:mt-2">
                <Wallet className="h-2 w-2 sm:h-3 sm:w-3 text-purple-500" />
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Total balance</span>
              </div>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Balance Summary */}
      <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-4 sm:p-6 lg:p-8 backdrop-blur-sm ${isDark
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-gray-100'
        }`}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Detailed Balance Analysis</h3>
          <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Current Month Summary */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">Current Month ({selectedMonth})</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Income:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                  ₹{currentMonthData.income.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Expenses:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                  ₹{currentMonthData.expenses.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-600">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Net:</span>
                <span className={`font-bold text-xs sm:text-sm ${currentMonthData.savings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  ₹{currentMonthData.savings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Month-over-Month Changes */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">vs {balanceAnalytics.previousMonthKey}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Income Change:</span>
                <span className={`font-bold text-xs sm:text-sm ${balanceAnalytics.incomeChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {balanceAnalytics.incomeChange >= 0 ? '+' : ''}{balanceAnalytics.incomeChange.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Expense Change:</span>
                <span className={`font-bold text-xs sm:text-sm ${balanceAnalytics.expenseChange <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {balanceAnalytics.expenseChange >= 0 ? '+' : ''}{balanceAnalytics.expenseChange.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-600">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Transactions:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
                  {balanceAnalytics.totalTransactions}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Averages */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">Daily Averages</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Avg Income:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                  ₹{balanceAnalytics.dailyAvgIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Avg Expense:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                  ₹{balanceAnalytics.dailyAvgExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-600">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Net Daily:</span>
                <span className={`font-bold text-xs sm:text-sm ${(balanceAnalytics.dailyAvgIncome - balanceAnalytics.dailyAvgExpense) >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  ₹{(balanceAnalytics.dailyAvgIncome - balanceAnalytics.dailyAvgExpense).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* Top Spending & Balance Status */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">Insights</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Top Category:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 text-xs sm:text-sm">
                  {balanceAnalytics.topCategory?.name || 'None'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Amount:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 text-xs sm:text-sm">
                  ₹{balanceAnalytics.topCategory?.amount.toLocaleString('en-IN') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-600">
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Total Balance:</span>
                <span className={`font-bold text-xs sm:text-sm ${availableBalance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  ₹{availableBalance.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Monthly Trends */}
        {/* <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-4 sm:p-6 lg:p-8 backdrop-blur-sm ${isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Monthly Trends</h3>
          </div>
          <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-4 sm:p-6 lg:p-8 backdrop-blur-sm ${isDark
    ? 'bg-slate-800 border-slate-700'
    : 'bg-white border-gray-100'
  }`}>
  <div className="flex items-center justify-between mb-4 sm:mb-6">
    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Monthly Trends</h3>
  </div>
  
</div>
        </div> */}
        <div className={`relative h-72 sm:h-96 lg:h-[30rem] rounded-xl sm:rounded-2xl shadow-xl border p-4 sm:p-6 lg:p-8 backdrop-blur-sm overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Monthly Trends
            </h3>
          </div>

          {/* Empty State Overlay */}
          {!hasBarChartData(monthlyData) && (
            <div className="
      absolute inset-0 flex flex-col items-center justify-center
      bg-white/85 dark:bg-slate-900/90 z-10
      rounded-xl sm:rounded-2xl h-full w-full px-4
    ">
              <Gem className="h-10 w-10 sm:h-14 sm:w-14 mb-4 opacity-60 text-blue-500 dark:text-yellow-300" />
              <p className="font-semibold text-base sm:text-lg text-gray-700 dark:text-white">
                {selectedMonth} is looking extra <span className="font-bold text-blue-500 dark:text-yellow-300">sparkly</span>!
              </p>
              <p className="text-xs sm:text-sm mt-1 text-gray-500 dark:text-gray-400">
                No income or spending yet — your wallet's untouchably fresh.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 italic mt-1">
                Add your first transaction to light up your chart!
              </p>
            </div>
          )}

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#475569' : '#e2e8f0'} />
              <XAxis
                dataKey="month"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={13}
              >
                <Label
                  value="Month"
                  offset={-5}
                  position="insideBottom"
                  fill={isDark ? '#e2e8f0' : '#475569'}
                  fontSize={13}
                  style={{
                    fontWeight: 500,
                    letterSpacing: '.03em',
                  }}
                />
              </XAxis>
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={13}
                tickFormatter={v => `₹${v}`}
              >
                <Label
                  value="Amount (₹)"
                  angle={-90}
                  position="insideLeft"
                  fill={isDark ? '#e2e8f0' : '#475569'}
                  fontSize={13}
                  style={{
                    fontWeight: 500,
                    letterSpacing: '.03em',
                  }}
                />
              </YAxis>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? 'rgba(30,41,59,0.97)' : 'rgba(255,255,255,0.97)',
                  border: isDark ? '1px solid #475569' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 16px rgba(16,42,89,0.12)',
                  backdropFilter: 'blur(8px)',
                  color: isDark ? '#fff' : '#000',
                  fontSize: '13px'
                }}
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
              />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#f43f5e" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="#3b82f6" name="Savings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>





        {/* Category Breakdown */}
        <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-4 sm:p-6 lg:p-8 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Expense Categories</h3>
          </div>
          <div className="h-48 sm:h-64 lg:h-80">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    stroke="#ffffff"
                    strokeWidth={2}
                    fontSize={18}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      border: isDark ? '1px solid #475569' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      backdropFilter: 'blur(8px)',
                      color: isDark ? '#ffffff' : '#000000',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Gem className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium text-sm sm:text-base">
                    {selectedMonth} is looking a little <span className="font-bold text-emerald-400">shiny</span>—no expenses yet!
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    Your wallet must be doing a happy dance. Add your first expense to see where the magic happens!
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category List */}
      {categoryData.length > 0 && (
        <div className={`rounded-xl sm:rounded-2xl shadow-xl border p-4 sm:p-6 lg:p-8 backdrop-blur-sm ${isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-100'
          }`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Category Breakdown - {selectedMonth}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categoryData.map((category, index) => (
              <div key={index} className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 ${isDark
                ? 'bg-gradient-to-r from-slate-700 to-slate-600'
                : 'bg-gradient-to-r from-gray-50 to-gray-100'
                }`}>
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm lg:text-base truncate">{category.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm lg:text-lg flex-shrink-0">₹{category.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
import React, { useState, useMemo } from 'react';
import { Trash2, Calendar, Tag, Wallet, Gem, AlertTriangle, X } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import { format, parseISO } from 'date-fns';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group expenses by month
  const expensesByMonth = useMemo(() => {
    const grouped = sortedExpenses.reduce((acc, expense) => {
      const monthKey = format(parseISO(expense.date), 'MMMM yyyy');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(expense);
      return acc;
    }, {} as Record<string, typeof expenses>);

    return grouped;
  }, [sortedExpenses]);

  // Calculate running balance for each month
  const monthlyBalances = useMemo(() => {
    const balances: Record<string, { income: number; expenses: number; balance: number; runningBalance: number }> = {};
    let runningBalance = 0;

    // Sort months chronologically
    const sortedMonths = Object.keys(expensesByMonth).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );

    sortedMonths.forEach(month => {
      const monthExpenses = expensesByMonth[month];
      const income = monthExpenses
        .filter(exp => exp.type === 'income')
        .reduce((sum, exp) => sum + exp.amount, 0);
      const expenseAmount = monthExpenses
        .filter(exp => exp.type === 'expense')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      const monthBalance = income - expenseAmount;
      runningBalance += monthBalance;

      balances[month] = {
        income,
        expenses: expenseAmount,
        balance: monthBalance,
        runningBalance
      };
    });

    return balances;
  }, [expensesByMonth]);

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const handleConfirmDelete = async (id: string) => {
    await deleteExpense(id);
    setDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-slate-200 dark:via-slate-100 dark:to-slate-50 bg-clip-text text-transparent">
            Transaction History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium text-sm sm:text-base">
            Your smart financial records organized by month
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {expenses.length}
          </div>
          <div className="flex items-center justify-end space-x-1 text-blue-600 dark:text-slate-400">
            <Gem className="h-4 w-4" />
            <span className="text-sm font-semibold">Total Transactions</span>
          </div>
        </div>
      </div>

      {Object.keys(expensesByMonth).length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 backdrop-blur-sm">
          <div className="p-6 lg:p-8">
            <div className="text-center py-12 lg:py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-6">
                <Calendar className="h-12 w-12 lg:h-16 lg:w-16 mx-auto" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No transactions yet</h3>
              <p className="text-gray-500 dark:text-gray-500 text-sm lg:text-base">Add your first transaction to get started with smart tracking</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-6">
          {Object.entries(expensesByMonth)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([month, monthExpenses]) => {
              const monthData = monthlyBalances[month];
              return (
                <div key={month} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 backdrop-blur-sm">
                  <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-slate-700">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">{month}</h3>
                        <div className="flex items-center space-x-1 text-blue-600 dark:text-slate-400 mt-1">
                          <Wallet className="h-4 w-4" />
                          <span className="text-sm font-semibold">{monthExpenses.length} transactions</span>
                        </div>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Income</p>
                            <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                              ₹{monthData.income.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Expenses</p>
                            <p className="text-rose-600 dark:text-rose-400 font-bold">
                              ₹{monthData.expenses.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-slate-600">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Monthly Balance</p>
                          <p className={`font-bold ${
                            monthData.balance >= 0 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            ₹{monthData.balance.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Running Balance</p>
                          <p className={`font-bold ${
                            monthData.runningBalance >= 0 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            ₹{monthData.runningBalance.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                    {monthExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-slate-600"
                      >
                        <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-md ${
                            expense.type === 'income' 
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-emerald-500/25' 
                              : 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/25'
                          }`}>
                            {expense.type === 'income' ? '+' : '-'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base truncate">{expense.description}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1 gap-1 sm:gap-0">
                              <div className="flex items-center space-x-1">
                                <Tag className="h-3 w-3" />
                                <span className="font-medium">{expense.category}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span className="font-medium">{format(parseISO(expense.date), 'MMM dd')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
                          <div className={`text-sm lg:text-lg font-bold ${
                            expense.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString('en-IN')}
                          </div>
                          <button
                            onClick={() => handleDeleteClick(expense.id)}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-slate-700">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Transaction</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm lg:text-base">
                Are you sure you want to delete this transaction? This will permanently remove it from your records.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm lg:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-200 font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 text-sm lg:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
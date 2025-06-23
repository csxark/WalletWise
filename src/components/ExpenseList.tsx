import { Trash2, Calendar, Tag, Gem } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import { format, parseISO } from 'date-fns';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();

  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
            Transaction History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 md:mt-2 font-medium text-sm md:text-base">
            Your financial records
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {expenses.length}
          </div>
          <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
            <Gem className="h-4 w-4" />
            <span className="text-sm font-semibold">Total Transactions</span>
          </div>
        </div>
      </div>

      {/* Main Content Card - Responsive */}
      <div className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 backdrop-blur-sm">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {sortedExpenses.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-4 md:mb-6">
                  <Calendar className="h-12 w-12 md:h-16 md:w-16 mx-auto" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No transactions yet</h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-500 px-4">Add your first transaction to get started with premium tracking</p>
              </div>
            ) : (
              sortedExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 md:p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl md:rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-slate-600 space-y-4 sm:space-y-0"
                >
                  {/* Left Section - Icon and Details */}
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl font-bold shadow-lg flex-shrink-0 ${
                      expense.type === 'income' 
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-emerald-500/25' 
                        : 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/25'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate">{expense.description}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 lg:space-x-6 text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-2 space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                          <Tag className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                          <span className="font-medium truncate">{expense.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                          <span className="font-medium">{format(parseISO(expense.date), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Section - Amount and Delete Button */}
                  <div className="flex items-center justify-between sm:justify-end sm:space-x-4 md:space-x-6">
                    <div className={`text-lg md:text-2xl font-bold ${
                      expense.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="p-2 md:p-3 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg md:rounded-xl transition-all duration-200 hover:scale-110 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;

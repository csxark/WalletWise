import React, { useState } from 'react';
import { X, Wallet, Sparkles, AlertCircle } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import { expenseCategories, incomeCategories } from '../data/categories';

interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose }) => {
  const { addExpense, fetchExpenses } = useExpenses();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'expense' | 'income'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
        type: formData.type
      });

      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      });

      // Refresh the data to ensure UI is updated
      await fetchExpenses();

      onClose();
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 lg:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-200 dark:border-slate-700 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-yellow-400 dark:to-yellow-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Add {formData.type === 'expense' ? 'Expense' : 'Income'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Smart transaction entry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg sm:rounded-xl transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl flex items-start space-x-2 sm:space-x-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Type Toggle */}
          <div className="flex bg-gray-100 dark:bg-slate-700 rounded-xl shadow-sm sm:rounded-2xl p-1 sm:p-1.5">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${formData.type === 'expense'
                  ? 'bg-white dark:bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 dark:text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${formData.type === 'income'
                  ? 'bg-white dark:bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 dark:text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold text-sm sm:text-base">₹</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-semibold text-base sm:text-lg"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm sm:text-base"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 100) {
                  setFormData({ ...formData, description: value });
                  if (error) setError('');
                }
              }}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm sm:text-base"
              placeholder="Enter description..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right select-none">
              {formData.description.length} / 100
            </p>
          </div>


          {/* Date */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm sm:text-base"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-yellow-400 dark:via-yellow-500 dark:to-yellow-600 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 dark:hover:from-yellow-500 dark:hover:via-yellow-600 dark:hover:to-yellow-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg shadow-blue-500/25 dark:shadow-yellow-500/25 hover:shadow-blue-500/40 dark:hover:shadow-yellow-600/40 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" />
            ) : (
              <>
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Add {formData.type === 'expense' ? 'Expense' : 'Income'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
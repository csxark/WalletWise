import React, { useState } from 'react';
import { X, Crown, Sparkles } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import { expenseCategories, incomeCategories } from '../data/categories';

interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose }) => {
  const { addExpense } = useExpenses();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'expense' | 'income'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.description) return;

    addExpense({
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
    
    // Reload the page after successful submission
    window.location.reload();
  };

  const categories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 w-auto overflow-y-auto h-100vh">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200 dark:border-amber-700">
        <div className="flex items-center justify-between p-8 border-b border-blue-100 dark:border-amber-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 dark:from-amber-400 dark:to-yellow-600 dark:shadow-amber-500/30">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900 dark:text-amber-100">
                Add {formData.type === 'expense' ? 'Expense' : 'Income'}
              </h2>
              <p className="text-sm text-blue-500 dark:text-amber-300">Transaction entry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-100 dark:hover:bg-amber-800 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-blue-500 dark:text-amber-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Type Toggle */}
          <div className="flex bg-blue-50 dark:bg-slate-900 rounded-2xl p-1.5">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                formData.type === 'expense'
                  ? 'bg-white dark:bg-amber-700 text-blue-900 dark:text-amber-50 shadow-lg shadow-blue-200/40 dark:shadow-amber-900/40'
                  : 'text-blue-600 dark:text-amber-200 hover:text-blue-900 dark:hover:text-amber-100'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                formData.type === 'income'
                  ? 'bg-white dark:bg-amber-700 text-blue-900 dark:text-amber-50 shadow-lg shadow-blue-200/40 dark:shadow-amber-900/40'
                  : 'text-blue-600 dark:text-amber-200 hover:text-blue-900 dark:hover:text-amber-100'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 dark:text-amber-200 mb-3 uppercase tracking-wide">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-amber-300 font-semibold">₹</span>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-blue-300 dark:border-amber-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-blue-900 dark:text-amber-50 font-semibold text-lg"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 dark:text-amber-200 mb-3 uppercase tracking-wide">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-blue-300 dark:border-amber-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-blue-900 dark:text-amber-50 font-medium"
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
            <label className="block text-sm font-semibold text-blue-700 dark:text-amber-200 mb-3 uppercase tracking-wide">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-blue-300 dark:border-amber-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-blue-900 dark:text-amber-50 font-medium"
              placeholder="Enter description..."
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-blue-700 dark:text-amber-200 mb-3 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border border-blue-300 dark:border-amber-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-blue-900 dark:text-amber-50 font-medium"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-700 hover:via-sky-600 hover:to-blue-800 text-white py-4 px-6 rounded-xl transition-all duration-200 font-bold text-lg flex items-center justify-center space-x-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105
              dark:from-amber-400 dark:via-yellow-600 dark:to-amber-700 dark:hover:from-amber-500 dark:hover:via-yellow-500 dark:hover:to-amber-800 dark:shadow-amber-500/25 dark:hover:shadow-amber-500/40"
          >
            <Sparkles className="h-5 w-5" />
            <span>Add {formData.type === 'expense' ? 'Expense' : 'Income'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
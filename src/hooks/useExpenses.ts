import { useState, useEffect } from 'react';
import { Expense, MonthlyData, CategoryData } from '../types';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      // Initialize with sample data in Indian Rupees
      const sampleData: Expense[] = [
        { id: '1', amount: 75000, category: 'Pocket Money', description: 'Monthly Pocket Money', date: '2024-01-01', type: 'income' },
        { id: '2', amount: 8500, category: 'Food', description: 'Groceries', date: '2024-01-03', type: 'expense' },
        { id: '3', amount: 2500, category: 'Transportation', description: 'Petrol', date: '2024-01-05', type: 'expense' },
        { id: '4', amount: 1200, category: 'Entertainment', description: 'Movie night', date: '2024-01-07', type: 'expense' },
        { id: '5', amount: 4500, category: 'Utilities', description: 'Electricity bill', date: '2024-01-10', type: 'expense' },
        { id: '6', amount: 75000, category: 'Pocket Money', description: 'Monthly Pocket Money', date: '2024-02-01', type: 'income' },
        { id: '7', amount: 9200, category: 'Food', description: 'Groceries', date: '2024-02-03', type: 'expense' },
        { id: '8', amount: 1800, category: 'Transportation', description: 'Public transport', date: '2024-02-05', type: 'expense' },
      ];
      setExpenses(sampleData);
      localStorage.setItem('expenses', JSON.stringify(sampleData));
    }
  }, []);

  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    const newExpenses = [...expenses, newExpense];
    saveExpenses(newExpenses);
  };

  const deleteExpense = (id: string) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(newExpenses);
  };

  const getCurrentMonthData = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return expenseDate >= start && expenseDate <= end;
    });

    const income = currentMonthExpenses
      .filter(expense => expense.type === 'income')
      .reduce((sum, expense) => sum + expense.amount, 0);

    const expenseAmount = currentMonthExpenses
      .filter(expense => expense.type === 'expense')
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      income,
      expenses: expenseAmount,
      savings: income - expenseAmount
    };
  };

  const getMonthlyData = (): MonthlyData[] => {
    const monthlyMap = new Map<string, { income: number; expenses: number }>();

    expenses.forEach(expense => {
      const month = format(parseISO(expense.date), 'MMM yyyy');
      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { income: 0, expenses: 0 });
      }
      
      const data = monthlyMap.get(month)!;
      if (expense.type === 'income') {
        data.income += expense.amount;
      } else {
        data.expenses += expense.amount;
      }
    });

    return Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        savings: data.income - data.expenses
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  };

  const getCategoryData = (): CategoryData[] => {
    const categoryMap = new Map<string, number>();

    expenses
      .filter(expense => expense.type === 'expense')
      .forEach(expense => {
        const current = categoryMap.get(expense.category) || 0;
        categoryMap.set(expense.category, current + expense.amount);
      });

    return Array.from(categoryMap.entries())
      .map(([name, amount]) => ({
        name,
        amount,
        color: getCategoryColor(name)
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getCategoryColor = (categoryName: string): string => {
    const colors = [
      '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4',
      '#10B981', '#3B82F6', '#F97316', '#6B7280'
    ];
    
    const index = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    getCurrentMonthData,
    getMonthlyData,
    getCategoryData
  };
};



import { useState, useEffect } from 'react';
import { Expense, MonthlyData, CategoryData } from '../types';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else {
      setExpenses([]);
      setLoading(false);
    }
  }, [user]);

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedExpenses: Expense[] = data.map(expense => ({
        id: expense.id,
        amount: parseFloat(expense.amount.toString()),
        category: expense.category,
        description: expense.description,
        date: expense.date,
        type: expense.type as 'expense' | 'income'
      }));

      setExpenses(formattedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([
          {
            user_id: user.id,
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            date: expense.date,
            type: expense.type
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const newExpense: Expense = {
        id: data.id,
        amount: parseFloat(data.amount.toString()),
        category: data.category,
        description: data.description,
        date: data.date,
        type: data.type as 'expense' | 'income'
      };

      setExpenses(prev => [newExpense, ...prev]);
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  const getMonthData = (month: string) => {
    const monthExpenses = expenses.filter(expense => {
      const expenseMonth = format(parseISO(expense.date), 'MMM yyyy');
      return expenseMonth === month;
    });

    const income = monthExpenses
      .filter(expense => expense.type === 'income')
      .reduce((sum, expense) => sum + expense.amount, 0);

    const expenseAmount = monthExpenses
      .filter(expense => expense.type === 'expense')
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      income,
      expenses: expenseAmount,
      savings: income - expenseAmount
    };
  };

  const getCurrentMonthData = () => {
    const currentMonth = format(new Date(), 'MMM yyyy');
    return getMonthData(currentMonth);
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

  const getCategoryData = (month?: string): CategoryData[] => {
    let filteredExpenses = expenses.filter(expense => expense.type === 'expense');
    
    if (month) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseMonth = format(parseISO(expense.date), 'MMM yyyy');
        return expenseMonth === month;
      });
    }

    const categoryMap = new Map<string, number>();

    filteredExpenses.forEach(expense => {
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

  const getAvailableMonths = (): string[] => {
    const months = new Set<string>();
    expenses.forEach(expense => {
      const month = format(parseISO(expense.date), 'MMM yyyy');
      months.add(month);
    });
    return Array.from(months).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  return {
    expenses,
    loading,
    addExpense,
    deleteExpense,
    getCurrentMonthData,
    getMonthlyData,
    getCategoryData,
    getMonthData,
    getAvailableMonths,
    fetchExpenses
  };
};
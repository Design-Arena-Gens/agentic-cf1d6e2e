'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'expenses-v1';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setExpenses(JSON.parse(saved));
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (err) {
      // ignore
    }
  }, [expenses]);

  const addExpense = (expense) => {
    const toAdd = { id: generateId(), ...expense };
    setExpenses((prev) => [toAdd, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const clearAll = () => setExpenses([]);

  return { expenses, addExpense, deleteExpense, clearAll };
}

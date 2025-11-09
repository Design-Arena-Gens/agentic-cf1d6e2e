'use client';

import { useMemo, useState } from 'react';
import { useExpenses } from '../lib/useExpenses';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const DEFAULT_CATEGORIES = [
  'Groceries',
  'Transport',
  'Eating Out',
  'Utilities',
  'Shopping',
  'Health',
  'Entertainment',
  'Travel',
  'General',
];

function formatCurrency(value) {
  if (Number.isNaN(value)) return '?';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
}

function getMonthKey(dateStr) {
  return dateStr?.slice(0, 7); // YYYY-MM
}

export default function HomePage() {
  const { expenses, addExpense, deleteExpense, clearAll } = useExpenses();
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const months = useMemo(() => {
    const set = new Set(expenses.map((e) => getMonthKey(e.date)).filter(Boolean));
    const arr = Array.from(set).sort().reverse();
    if (!arr.includes(selectedMonth)) arr.push(selectedMonth);
    return arr.filter(Boolean);
  }, [expenses, selectedMonth]);

  const monthExpenses = useMemo(() => {
    return expenses.filter((e) => getMonthKey(e.date) === selectedMonth);
  }, [expenses, selectedMonth]);

  const totals = useMemo(() => {
    const totalAll = expenses.reduce((s, e) => s + (e.amount || 0), 0);
    const totalMonth = monthExpenses.reduce((s, e) => s + (e.amount || 0), 0);
    const byCategory = monthExpenses.reduce((acc, e) => {
      const key = e.category || 'General';
      acc[key] = (acc[key] || 0) + (e.amount || 0);
      return acc;
    }, {});
    return { totalAll, totalMonth, byCategory };
  }, [expenses, monthExpenses]);

  return (
    <main className="container">
      <header className="header">
        <h1>Expense Dashboard</h1>
        <div className="controls-row">
          <label className="label">
            Month
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </label>
          <button className="btn danger" onClick={clearAll} title="Clear all saved expenses">
            Clear All
          </button>
        </div>
      </header>

      <section className="summary">
        <div className="card">
          <div className="card-title">This Month</div>
          <div className="card-value">{formatCurrency(totals.totalMonth)}</div>
        </div>
        <div className="card">
          <div className="card-title">All Time</div>
          <div className="card-value">{formatCurrency(totals.totalAll)}</div>
        </div>
        <div className="card">
          <div className="card-title">Categories</div>
          <div className="categories">
            {Object.keys(totals.byCategory).length === 0 && <div className="muted">No data</div>}
            {Object.entries(totals.byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amount]) => (
                <div key={cat} className="category-row">
                  <span>{cat}</span>
                  <span className="amount">{formatCurrency(amount)}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="left">
          <h2>Add Expense</h2>
          <ExpenseForm categories={DEFAULT_CATEGORIES} onAdd={addExpense} />
        </div>
        <div className="right">
          <h2>
            Expenses for <span className="mono">{selectedMonth}</span>
          </h2>
          <ExpenseTable expenses={monthExpenses} onDelete={deleteExpense} />
        </div>
      </section>

      <footer className="footer">
        <span className="muted">Data is stored locally in your browser.</span>
      </footer>
    </main>
  );
}

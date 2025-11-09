'use client';

import { useState } from 'react';

export default function ExpenseForm({ categories, onAdd }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(categories?.[0] || 'General');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (Number.isNaN(parsed) || parsed <= 0) return;
    onAdd({ date, category, amount: parsed, note });
    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-row">
        <label className="label">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-row">
        <label className="label">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {(categories || ['General']).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label className="label">Amount</label>
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-row full">
        <label className="label">Note</label>
        <input
          type="text"
          placeholder="Optional description"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="form-row full" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn">Add</button>
      </div>
    </form>
  );
}

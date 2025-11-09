'use client';

function formatCurrency(value) {
  if (Number.isNaN(value)) return '?';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
}

export default function ExpenseTable({ expenses, onDelete }) {
  if (!expenses?.length) {
    return <div className="muted">No expenses for this month.</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Date</th>
            <th>Category</th>
            <th>Note</th>
            <th style={{ width: 130, textAlign: 'right' }}>Amount</th>
            <th style={{ width: 90 }}></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td className="mono">{e.date}</td>
              <td>{e.category || '?'}</td>
              <td className="muted">{e.note || '?'}</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(e.amount)}</td>
              <td>
                <div className="actions">
                  <button className="btn danger" onClick={() => onDelete(e.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

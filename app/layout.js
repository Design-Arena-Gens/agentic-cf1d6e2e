import './globals.css';

export const metadata = {
  title: 'Expense Dashboard',
  description: 'Track your expenses easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// src/app/layout.tsx
import './globals.css';


export const metadata = {
  title: 'Task Manager',
  description: 'Manage team tasks efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


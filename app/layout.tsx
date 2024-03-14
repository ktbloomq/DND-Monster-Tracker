import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import 'bootstrap/dist/js/bootstrap';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark">{children}</body>
    </html>
  );
}

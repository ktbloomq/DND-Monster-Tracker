// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './globals.css';
// import 'bootstrap/dist/js/bootstrap';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";
import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-100">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}

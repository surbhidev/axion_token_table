"use client";

import React from "react";

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("ErrorBoundary caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center p-6">
          <div className="max-w-lg text-center bg-zinc-950 border border-rose-800/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-rose-300">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Unexpected error occurred. Please refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

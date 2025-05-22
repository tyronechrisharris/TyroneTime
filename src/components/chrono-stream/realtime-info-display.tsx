'use client';

import ClockDisplay from './clock-display';
import ConnectionCounter from './connection-counter';
import { useState, useEffect } from 'react';

export default function RealtimeInfoDisplay() {
  // Placeholder for connection count. In a real scenario, this might come from Firebase or an API.
  const [connectionCount, setConnectionCount] = useState(0);

  useEffect(() => {
    // Simulate connection count updates if needed, or fetch from a source
    // For now, it's static after initial mount.
    // Example: const interval = setInterval(() => setConnectionCount(Math.floor(Math.random() * 101)), 5000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-inner bg-card text-card-foreground border border-border">
      <div className="font-geist-mono text-center">
        <ClockDisplay />
        <ConnectionCounter count={connectionCount} />
      </div>
    </div>
  );
}

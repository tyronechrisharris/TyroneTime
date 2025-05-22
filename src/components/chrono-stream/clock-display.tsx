'use client';

import { useState, useEffect } from 'react';

export default function ClockDisplay() {
  const [time, setTime] = useState('');

  useEffect(() => {
    let animationFrameId: number;

    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      setTime(`${hours}:${minutes}:${seconds}.${milliseconds}`);
      animationFrameId = requestAnimationFrame(updateClock);
    };

    animationFrameId = requestAnimationFrame(updateClock);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="text-5xl font-medium tracking-wider py-4 text-foreground"
      aria-live="polite"
      aria-atomic="true"
      role="timer"
    >
      {time || '00:00:00.000'}
    </div>
  );
}

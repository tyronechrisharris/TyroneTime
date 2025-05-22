import type { FC } from 'react';

interface ConnectionCounterProps {
  count: number;
}

const ConnectionCounter: FC<ConnectionCounterProps> = ({ count }) => {
  return (
    <div className="text-2xl text-muted-foreground pt-2">
      Connected Streams: <span className="font-semibold text-accent-foreground">{count}</span>
    </div>
  );
};

export default ConnectionCounter;

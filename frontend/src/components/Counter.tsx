// src/components/Counter.tsx
import React, { useEffect, useState } from 'react';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Create an observable stream that emits a value every second
    const countObservable: Observable<number> = interval(1000).pipe(
      map((val) => val + 1), // Increment the emitted value
      take(10) // Only take the first 10 values
    );

    // Subscribe to the observable to update the count state
    const subscription = countObservable.subscribe({
      next: (value) => setCount(value),
      complete: () => console.log('Counting complete!')
    });

    // Cleanup the subscription when the component is unmounted
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Counter: {count}</h2>
    </div>
  );
};

export default Counter;

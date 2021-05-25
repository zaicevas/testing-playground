import React from 'react';

function TestResult({ error }) {
  const color = error ? 'bg-red-600' : 'bg-green-600';
  const text = error ? error : 'Pass';

  return (
    <div className="space-y-4 text-sm">
      <div className={['text-white p-4 rounded space-y-2', color].join(' ')}>
        {text && (
          <div className="flex justify-between">
            <div className="font-mono cursor-pointer text-xs">
              &gt; {text}
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestResult;

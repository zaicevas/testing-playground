import React from 'react';
import CopyButton from './CopyButton';

function UserEventResultSuggestion({ query }) {
  const color = 'bg-green-600';

  return (
    <div className="space-y-4 text-sm">
      <div className={['text-white p-4 rounded space-y-2', color].join(' ')}>
        {query && (
          <div className="flex justify-between">
            <div className="font-mono cursor-pointer text-xs">
              &gt; {query}
              <br />
            </div>
            <CopyButton title="copy query" text={query} variant="white" />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserEventResultSuggestion;

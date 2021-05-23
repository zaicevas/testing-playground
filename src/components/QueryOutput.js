import React from 'react';
import { TrashIcon } from '@primer/octicons-react';
import Expandable from './Expandable';

function QueryOutput({ error, result, isTest, dispatch }) {
  const handleClearClick = () => {
    dispatch({ type: 'CLEAR_TEST' });
  };

  if (isTest) {
    return (
      <button
        className="query-result bg-gray-800 text-gray-100 font-mono text-xs z-10 flex-none py-2 px-4 flex justify-end w-full"
        onClick={handleClearClick}
      >
        <TrashIcon size={16} />
      </button>
    );
  }

  return (
    <Expandable
      className="query-result bg-gray-800 text-gray-100 font-mono text-xs z-10"
      variant="dark"
      labelText="query suggestion"
    >
      {error ? `Error: ${error}` : '> ' + (result || 'undefined')}
    </Expandable>
  );
}

export default React.memo(QueryOutput);

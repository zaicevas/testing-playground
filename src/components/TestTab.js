import React from 'react';
import QueryEditor from './QueryEditor';

function TestTab({ dispatch }) {
  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="query-editor flex-auto relative">
        <QueryEditor initialValue="" dispatch={dispatch} />
      </div>
    </div>
  );
}

export default React.memo(TestTab);

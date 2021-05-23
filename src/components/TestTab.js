import React, { useState } from 'react';
import QueryEditor from './QueryEditor';
import QueryOutput from './QueryOutput';

function TestTab({ dispatch, test }) {
  const [initialValue] = useState(test);

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="query-editor flex-auto relative">
        <QueryEditor isTest initialValue={initialValue} dispatch={dispatch} />
      </div>
      <QueryOutput isTest dispatch={dispatch} />
    </div>
  );
}

export default React.memo(TestTab);

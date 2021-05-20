import React, { useCallback } from 'react';
import Editor from './Editor';

function QueryEditor(props) {
  const { dispatch, initialValue, isTest } = props;

  const onLoad = useCallback(
    (editor) => dispatch({ type: 'SET_QUERY_EDITOR', editor }),
    [dispatch],
  );

  const onChange = useCallback(
    (query, { origin }) =>
      dispatch({
        type: 'SET_QUERY',
        query,
        origin: 'EDITOR',
        immediate: origin === 'user',
      }),
    [dispatch],
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Editor
        mode="javascript"
        initialValue={initialValue}
        onLoad={onLoad}
        onChange={onChange}
        isTest={isTest}
      />
    </div>
  );
}

export default React.memo(QueryEditor);

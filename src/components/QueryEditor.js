import React, { useCallback } from 'react';
import Editor from './Editor';

function QueryEditor(props) {
  const { dispatch, initialValue, isTest } = props;

  const onLoad = useCallback(
    (editor) =>
      dispatch({
        type: isTest ? 'SET_TEST_EDITOR' : 'SET_QUERY_EDITOR',
        editor,
      }),
    [dispatch, isTest],
  );

  const onChange = useCallback(
    (query, { origin }) => {
      dispatch({
        type: isTest ? 'UPDATE_TEST' : 'SET_QUERY',
        query: isTest ? '' : query,
        test: isTest ? query : '',
        origin: 'EDITOR',
        immediate: origin === 'user',
      });
    },
    [dispatch, isTest],
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

import React from 'react';
import ErrorBox from './ErrorBox';
import EmptyPane from './EmptyPane';
import UserEventSuggestedQueries from './UserEventSuggestedQueries';
import UserEventResultSuggestion from './UserEventResultSuggestion';
import Scrollable from './Scrollable';

function UserEventSuggestions({ result, dispatch, isTestStarted }) {
  if (result?.error) {
    return (
      <ErrorBox caption={result.error.message} body={result.error.details} />
    );
  }

  if (
    !result ||
    !Array.isArray(result.elements) ||
    result.elements.length === 0 ||
    !isTestStarted
  ) {
    return (
      <div className="flex flex-col relative w-full h-full top-0 left-0">
        <EmptyPane />
      </div>
    );
  }

  const resultQuery = result.elements[0].suggestion.snippet;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Scrollable>
        <div className="pb-4 border-b">
          <UserEventResultSuggestion query={resultQuery} />
        </div>
        <UserEventSuggestedQueries
          dispatch={dispatch}
          resultQuery={resultQuery}
          isTestStarted={isTestStarted}
        />
      </Scrollable>
    </div>
  );
}

export default UserEventSuggestions;

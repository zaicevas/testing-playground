import React from 'react';
import EmptyPane from './EmptyPane';
import UserEventSuggestedQueries from './UserEventSuggestedQueries';
import UserEventResultSuggestion from './UserEventResultSuggestion';
import Scrollable from './Scrollable';
import TestResult from './TestResult';

function UserEventSuggestions({
  result,
  dispatch,
  isTestStarted,
  showTestResult,
}) {
  const error = result?.error?.message;

  if (error && showTestResult) {
    return (
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Scrollable>
          <div className="pb-4 border-b">
            <TestResult error={error} />
          </div>
        </Scrollable>
      </div>
    );
  }

  if (!error && showTestResult) {
    return (
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Scrollable>
          <div className="pb-4 border-b">
            <TestResult />
          </div>
        </Scrollable>
      </div>
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

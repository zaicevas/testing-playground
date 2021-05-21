import React, { Suspense } from 'react';
import { useState } from 'react';

import Query from './Query';
import Result from './Result';
import TabButton from './TabButton';
import TestTab from './TestTab';

const panels = ['Query', 'Events', 'Test'];

const DomEvents = React.lazy(() => import('./DomEvents'));

function Paper({ children }) {
  return (
    <div className="editor p-4 gap-4 md:gap-8 md:h-56 flex-auto grid-cols-1 md:grid-cols-2">
      {children}
    </div>
  );
}

function PlaygroundPanels({ state, dispatch }) {
  const { query, result, test } = state;
  const [panel, setPanel] = useState(panels[2]);

  return (
    <>
      <div className="px-4 gap-4 flex pt-3 pb-1 h-8">
        <div className="flex items-center">
          <div className="text-left space-x-2">
            {panels.map((panelName) => (
              <TabButton
                key={panelName}
                onClick={() => setPanel(panelName)}
                active={panelName === panel}
              >
                {panelName}
              </TabButton>
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        {panel === panels[0] && (
          <Paper>
            <div className="flex-auto relative h-56 md:h-full">
              <Query query={query} result={result} dispatch={dispatch} />
            </div>

            <div className="flex-auto h-56 md:h-full overflow-hidden">
              <Result result={result} dispatch={dispatch} />
            </div>
          </Paper>
        )}
        {panel === panels[1] && <DomEvents />}
        {panel === panels[2] && (
          <div className="editor p-4 gap-4 md:gap-8 md:h-56 flex-auto">
            <TestTab test={test} dispatch={dispatch} />
          </div>
        )}
      </Suspense>
    </>
  );
}

export default PlaygroundPanels;

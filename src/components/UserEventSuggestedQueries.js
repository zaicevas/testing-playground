import React from 'react';
import { userEventQueries } from '../constants';
import { Modal, ModalContents, ModalOpenButton } from './Modal';
import UserEventInputSelect from './UserEventInputSelect';

function Section({ children }) {
  return <div className="space-y-3">{children}</div>;
}

function Heading({ children }) {
  return <h3 className="text-xs font-bold">{children}</h3>;
}

const Field = React.memo(function Field({
  name,
  desc,
  dispatch,
  withInput,
  active,
  method,
  resultQuery,
  isTestStarted,
  isExpect,
}) {
  const handleClick = (input) => {
    if (!isTestStarted) {
      return;
    }

    // Bachelors: replace :input
    const query = method
      .replace(':query', resultQuery)
      .replace(':input', input);
    // console.log('resultQuery: ', resultQuery);
    // console.log('method: ', method);

    dispatch({
      type: 'ADD_TEST_QUERY',
      origin: 'SANDBOX',
      query,
    });
  };

  if (!withInput) {
    return (
      <div
        className={`text-xs field ${active ? 'active' : ''} ${
          isExpect ? 'bg-red-600' : ''
        }`}
        data-clickable
        onClick={handleClick}
      >
        <div
          className={`font-light ${
            isExpect ? 'text-red-800' : 'text-gray-800'
          }`}
        >
          {name}
        </div>
        <div className="truncate">{desc}</div>
      </div>
    );
  }

  return (
    <Modal>
      <ModalOpenButton>
        <div
          className={`text-xs field ${active ? 'active' : ''}`}
          data-clickable
        >
          <div
            className={`font-light ${
              isExpect ? 'text-red-800' : 'text-gray-800'
            }`}
          >
            {' '}
            {name}
          </div>
          <div className="truncate">{desc}</div>
        </div>
      </ModalOpenButton>
      <ModalContents>
        <UserEventInputSelect onClick={handleClick} />
      </ModalContents>
    </Modal>
  );
});

function QueryGroup({
  queries,
  heading,
  dispatch,
  resultQuery,
  isTestStarted,
  isExpectGroup,
}) {
  return (
    <Section>
      {heading && <Heading>{heading}</Heading>}
      {queries.map((query) => (
        <Field
          isTestStarted={isTestStarted}
          key={query.name}
          name={query.name}
          method={query.code}
          desc={query.desc}
          withInput={query.withInput}
          dispatch={dispatch}
          active={true}
          resultQuery={resultQuery}
          isExpect={isExpectGroup}
        />
      ))}
    </Section>
  );
}

const userEventQueriesLeft = userEventQueries.slice(0, 6);
const userEventQueriesRight = userEventQueries.slice(6);
const expectsLeft = [
  {
    name: 'expect().toBeInTheDocument',
    desc: 'Expects the DOM to contain the element',
    code: 'expect(:query).toBeInTheDocument()',
  },
];
const expectsRight = [
  {
    name: 'expect(text).toBeInTheDocument',
    desc: 'Expects the DOM to contain text',
    code: "expect(screen.getByText(':input')).toBeInTheDocument()",
    withInput: true,
  },
];

function UserEventSuggestedQueries({ dispatch, resultQuery, isTestStarted }) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <QueryGroup
        isTestStarted={isTestStarted}
        queries={userEventQueriesLeft}
        dispatch={dispatch}
        resultQuery={resultQuery}
      />
      <div className="space-y-8">
        <QueryGroup
          isTestStarted={isTestStarted}
          queries={userEventQueriesRight}
          dispatch={dispatch}
          resultQuery={resultQuery}
        />
      </div>
      <div className="space-y-8 pt-4">
        <QueryGroup
          isTestStarted={isTestStarted}
          queries={expectsLeft}
          dispatch={dispatch}
          resultQuery={resultQuery}
          isExpectGroup
        />
      </div>
      <div className="space-y-8 pt-4">
        <QueryGroup
          isTestStarted={isTestStarted}
          queries={expectsRight}
          dispatch={dispatch}
          resultQuery={resultQuery}
          isExpectGroup
        />
      </div>
    </div>
  );
}

export default React.memo(UserEventSuggestedQueries);

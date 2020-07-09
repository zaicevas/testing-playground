import { messages, queries } from '../constants';
import { computeAccessibleName, getRole } from 'dom-accessibility-api';
import { getSuggestedQuery, getConfig } from '@testing-library/dom';
import cssPath from './cssPath';
import { getFieldName } from './';

export function getData({ rootNode, element }) {
  const type = element.getAttribute('type');
  const tagName = element.tagName;

  // escape id to prevent querySelector from tripping over corrupted html like:
  //   <input id="button\n<button> & <input id=\ntype="text" />
  const id = (element.getAttribute('id') || '')
    .replace(/\s/g, '')
    .replace(/"/g, '\\"');

  const labelElem = id ? rootNode.querySelector(`[for="${id}"]`) : null;
  const labelText = labelElem ? labelElem.innerText : null;

  return {
    role: element.getAttribute('aria-hidden')
      ? undefined
      : element.getAttribute('role') || getRole(element),
    name: computeAccessibleName(element),
    tagName: tagName,
    type: type,
    labelText: labelText,
    placeholderText: element.getAttribute('placeholder'),
    text: element.innerText,
    displayValue:
      tagName.toLowerCase() === 'option' ? '' : element.getAttribute('value'),

    altText: element.getAttribute('alt'),
    title: element.getAttribute('title'),

    // it might be better to get this from the playground context instead of
    // pulling it out of testing-library, but that one is easier to fetch, and
    // at the end, it's the same.
    testId: element.getAttribute(getConfig().testIdAttribute),
  };
}

function flattenDOM(node) {
  return [
    node,
    ...Array.from(node.children).reduce(
      (acc, child) => [...acc, ...flattenDOM(child)],
      [],
    ),
  ];
}

function getSnapshot(element) {
  const innerItems = flattenDOM(element);
  const snapshot = innerItems
    .map((el) => {
      const suggestion = getSuggestedQuery(el);
      return suggestion && `screen.${suggestion.toString()};`;
    })
    .filter(Boolean)
    .join('\n');

  return snapshot;
}

// TODO:
// TestingLibraryDom.getSuggestedQuery($0, 'get').toString()
export const emptyResult = { data: {}, suggestion: {} };
export function getQueryAdvise({ rootNode, element }) {
  if (
    rootNode === element ||
    rootNode?.nodeType !== Node.ELEMENT_NODE ||
    element?.nodeType !== Node.ELEMENT_NODE
  ) {
    return emptyResult;
  }

  const suggestedQuery = getSuggestedQuery(element);
  const data = getData({ rootNode, element });

  if (!suggestedQuery) {
    // this will always work, but returns something potentially nasty, like:
    // '#tsf > div:nth-child(2) > div:nth-child(1) > div:nth-child(4)'
    const path = cssPath(element, true);

    return {
      suggestion: {
        level: 3,
        expression: `container.querySelector('${path}')`,
        snapshot: getSnapshot(element),
        method: '',
        ...messages[3],
      },
      data,
    };
  }

  const { level } = queries.find(
    ({ method }) => method === suggestedQuery.queryMethod,
  );

  const suggestion = {
    expression: `screen.${suggestedQuery.toString()}`,
    level,
    method: suggestedQuery.queryMethod,
    ...messages[level],
  };

  return {
    data,
    suggestion,
  };
}

export function getAllPossibileQueries(element) {
  const possibleQueries = queries
    .filter((query) => query.type !== 'MANUAL')
    .map((query) => {
      const method = getFieldName(query.method);
      return getSuggestedQuery(element, 'get', method);
    })
    .filter((suggestedQuery) => suggestedQuery !== undefined)
    .reduce((obj, suggestedQuery) => {
      obj[suggestedQuery.queryMethod] = suggestedQuery;
      return obj;
    }, {});

  return possibleQueries;
}

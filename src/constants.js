export const initialValues = {
  markup: `
<form>
  <div>
    <label for="email">Email address</label>
    <input
      type="email"
      id="email"
      aria-describedby="email-help"
      placeholder="Enter email"
    />
    <small id="email-help">It's safe with us. We hate spam!</small>
  </div>
  <div>
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      placeholder="Password"
    />
  </div>
  <div>
    <label for="terms">
      <input
        type="checkbox"
        id="terms"
      />
      <span>
        I accept the <a href="https://www.example.com"> terms and conditions</a>
      </span>
    </label>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
`.trim(),

  query: `
// Query your elements here, preferably with
// \`screen.getBy…(…)\`. If you can't use
// screen use \`container.querySelector(…)\`.

// container.querySelector('input')
screen.getByRole('button')
`.trim(),

  test: '',
  tab: 'Test',
};

export const queries = [
  { method: 'getByRole', level: 0, type: 'ACCESSIBLE' },
  { method: 'getByLabelText', level: 0, type: 'ACCESSIBLE' },
  {
    method: 'getByPlaceholderText',
    level: 0,
    type: 'ACCESSIBLE',
  },
  { method: 'getByText', level: 0, type: 'ACCESSIBLE' },
  { method: 'getByDisplayValue', level: 0, type: 'ACCESSIBLE' },

  { method: 'getByAltText', level: 1, type: 'SEMANTIC' },
  { method: 'getByTitle', level: 1, type: 'SEMANTIC' },

  { method: 'getByTestId', level: 2, type: 'TEST' },

  { method: 'querySelector', level: 3, type: 'MANUAL' },
];

function getQueryMethods(type) {
  return queries.filter((x) => x.type === type).map((x) => x.method);
}
// some quotes from https://testing-library.com/docs/guide-which-query
export const messages = [
  {
    heading: 'Queries Accessible to Everyone',
    description: `Queries that reflect the experience of visual/mouse users as well as those that use assistive technology. These should be your top preference.`,
    type: 'ACCESSIBLE',
    queries: getQueryMethods('ACCESSIBLE'),
  },
  {
    heading: 'Semantic Queries',
    description: `HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.`,
    type: 'SEMANTIC',
    queries: getQueryMethods('SEMANTIC'),
  },
  {
    heading: 'Test IDs',
    description: `The user cannot see (or hear) these, so this is only recommended for cases where you can't match by role or text or it doesn't make sense (e.g. the text is dynamic).`,
    type: 'TEST',
    queries: getQueryMethods('TEST'),
  },
  {
    heading: 'Manual Queries',
    description: `On top of the queries provided by the testing library, you can use the regular querySelector DOM API to query elements. Note that using this as an escape hatch to query by class or id is a bad practice because users can't see or identify these attributes. Use a testid if you have to.`,
    type: 'MANUAL',
    queries: getQueryMethods('MANUAL'),
  },
];

export const userEventQueries = [
  {
    name: 'click',
    desc: 'Clicks element',
    code: 'userEvent.click(:query)',
  },
  {
    name: 'dblClick',
    desc: 'Clicks element twice',
    code: 'userEvent.dblClick(:query)',
  },
  {
    name: 'type',
    desc: 'Types',
    code: "userEvent.type(:query, ':input')",
    withInput: true,
  },
  {
    name: 'keyboard',
    desc: 'Simulates keyboard events',
    code: "userEvent.keyboard(':input')",
    withInput: true,
  },
  // {
  //   name: 'upload',
  //   desc: 'Upload',
  //   code: "userEvent.upload(:query, ':input')",
  // },
  {
    name: 'clear',
    desc: 'Clear',
    code: 'userEvent.clear(:query)',
  },
  {
    name: 'selectOptions',
    desc: 'Select options',
    code: "userEvent.selectOptions(:query, ':input')",
    withInput: true,
  },
  {
    name: 'deselectOptions',
    desc: 'Deselect options',
    code: "userEvent.deselectOptions(:query, ':input')",
    withInput: true,
  },
  {
    name: 'tab',
    desc: 'Tab',
    code: 'userEvent.tab()',
  },
  {
    name: 'hover',
    desc: 'Hover',
    code: 'userEvent.hover(:query)',
  },
  {
    name: 'unhover',
    desc: 'Unhover',
    code: 'userEvent.unhover(:query)',
  },
  {
    name: 'paste',
    desc: 'Paste',
    code: "userEvent.paste(:query, ':input')",
    withInput: true,
  },
];

export const links = {
  testing_library_docs: {
    title: 'Introduction',
    url: 'https://testing-library.com/docs/dom-testing-library/intro',
  },

  common_mistakes: {
    title: 'Common Mistakes',
    url:
      'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library',
  },

  which_query: {
    title: 'Query Priority',
    url: 'https://testing-library.com/docs/guide-which-query',
  },
};

export const defaultPanes = ['query', 'preview'];

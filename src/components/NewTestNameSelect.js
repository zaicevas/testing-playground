import React, { useState } from 'react';
import Input from './Input';
import { ModalDismissButton } from './Modal';

function NewTestNameSelect({ onCreateClick }) {
  const [testName, setTestName] = useState('');

  const handleChange = (event) => {
    setTestName(event.target.value);
  };

  return (
    <div className="settings text-sm">
      <div>
        <h3 className="text-sm font-bold mb-2">Write down your test name</h3>

        <div className="flex space-x-4">
          <Input placeholder="render text" name="url" onChange={handleChange} />
        </div>

        <ModalDismissButton>
          <div className="mt-2">
            <button onClick={() => onCreateClick(testName)}>Create</button>
          </div>
        </ModalDismissButton>
      </div>
    </div>
  );
}

export default NewTestNameSelect;

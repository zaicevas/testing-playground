import React, { useState } from 'react';
import Input from './Input';
import { ModalDismissButton } from './Modal';

function UserEventInputSelect({ onClick }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="settings text-sm">
      <div>
        <div className="flex space-x-4">
          <Input placeholder="text" name="url" onChange={handleChange} />
        </div>

        <ModalDismissButton>
          <div className="mt-2">
            <button onClick={() => onClick(input)}>Create</button>
          </div>
        </ModalDismissButton>
      </div>
    </div>
  );
}

export default UserEventInputSelect;

import React from 'react';
import Input from './Input';

function NewTestNameSelect() {
  return (
    <div className="settings text-sm">
      <div>
        <h3 className="text-sm font-bold mb-2">Write down your test name</h3>

        <div className="flex space-x-4">
          <Input placeholder="render text" name="url" />
        </div>

        <div className="mt-2">
          <button>Create</button>
        </div>
      </div>
    </div>
  );
}

export default NewTestNameSelect;

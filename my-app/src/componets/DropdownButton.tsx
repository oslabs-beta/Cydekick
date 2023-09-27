// DropdownButton.tsx
import React, { useState } from 'react';

interface Props {
  label: string;
  onClickOption: (option: string) => void;
}

const DropdownButton: React.FC<Props> = ({ label, onClickOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown-container">
      <button onClick={() => setIsOpen(!isOpen)}>{label}</button>
      {isOpen && (
        <div className="dropdown-menu">
          {/* Placeholder Options */}
          <button onClick={() => onClickOption('Option 1')}>Option 1</button>
          <button onClick={() => onClickOption('Option 2')}>Option 2</button>
          <button onClick={() => onClickOption('Option 3')}>Option 3</button>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;

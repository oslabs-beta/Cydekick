// DropdownButton.tsx
import React, { useState } from 'react';

interface OptionDetails {
  option: string;
  code: string;
  tooltip: string;
}

interface Props {
  label: string;
  options: Record<string, OptionDetails>;
  onClickOption: (code: string, details: OptionDetails) => void;
}

const DropdownButton: React.FC<Props> = ({ label, onClickOption, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="dropdown-container relative">
      <button onClick={() => setIsOpen(!isOpen)}>{label}</button>
      {isOpen && (
        <div className="left-0 top-full mt-2 mb-2 flex flex-col border border-white">
          {Object.values(options).map((optionDetails) => (
            <button
              key={optionDetails.option}
              onClick={() => onClickOption(optionDetails.code, optionDetails)}
              title={optionDetails.tooltip}
              className="mb-2 hover:bg-gray-200 p-1 rounded"
            >
              {optionDetails.option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;

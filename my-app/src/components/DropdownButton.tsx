import React, { useState } from 'react';
import DynamicModal from './DynamicModal';

interface OptionDetails {
  option: string;
  code: string;
  tooltip: string;
  modal?: [];
  modalCreateCode?: (text: string) => string;
}

interface Props {
  label: string;
  options: Record<string, OptionDetails>;
  onClickOption: (code: string, details: OptionDetails) => void;
}

const DropdownButton: React.FC<Props> = ({ label, onClickOption, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  // array to keep track of state
  const [modalOpenStates, setModalOpenStates] = useState<boolean[]>(
    Object.keys(options).map(() => false),
  );

  function onButtonClick(index: number, optionDetails: OptionDetails) {
    if (!optionDetails.modal) {
      console.log(modalOpenStates);
      console.log(optionDetails.code);
      onClickOption(optionDetails.code, optionDetails);
    } else {
      // Open the modal for the selected option by updating its state
      const updatedModalStates = [...modalOpenStates];
      updatedModalStates[index] = true;
      setModalOpenStates(updatedModalStates);
    }
  }

  function closeModal(index: number) {
    // Close the modal for the specified option by updating its state
    const updatedModalStates = [...modalOpenStates];
    updatedModalStates[index] = false;
    setModalOpenStates(updatedModalStates);
  }

  return (
    <div className='dropdown-container relative'>
      <button onClick={() => setIsOpen(!isOpen)}>{label}</button>
      {isOpen && (
        <div className='left-0 top-full mt-2 mb-2 flex flex-col border border-white'>
          {Object.values(options).map((optionDetails, index) => (
            <div key={optionDetails.option}>
              <button
                onClick={() => onButtonClick(index, optionDetails)}
                title={optionDetails.tooltip}
                className='mb-2 hover.bg-gray-200 p-1 rounded'>
                {optionDetails.option}
              </button>
              <DynamicModal
                infoObj={optionDetails}
                isOpen={modalOpenStates[index]}
                setIsOpen={() => closeModal(index)}
                onClickOption={onClickOption}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;

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
    <div className='text-black dropdown-container relative border-green-400 rounded border-2 w-full h-full'>
      <div className='flex space-x-2'>
        {' '}
        {/* Adjust spacing between parent buttons */}
        <button className='hover:bg-gray-200 w-full h-full' onClick={() => setIsOpen(!isOpen)}>
          {label}
        </button>
        {/* Add other parent buttons here */}
      </div>
      {isOpen && (
        <div className='text-center absolute left-0 mt-2 mb-2 flex flex-col border border-white max-h-48 overflow-y-auto'>
          {Object.values(options).map((optionDetails, index) => (
            <div className='bg-secondaryPrimary' key={optionDetails.option}>
              <button
                onClick={() => {
                  onButtonClick(index, optionDetails);
                }}
                title={optionDetails.tooltip}
                className='w-full h-full text-center mb-2 hover:bg-gray-200 p-1 rounded'>
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

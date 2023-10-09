import { create } from 'domain';
import React from 'react';

function DynamicModal({ infoObj, isOpen, setIsOpen, onClickOption }): any {
  function createCode(): void {
    const modalForm = document.getElementById('modalForm');
    const modalElements = modalForm.elements;
    console.log(modalElements);
    const arrayOfEleVal = [];
    for (const ele of modalElements) {
      arrayOfEleVal.push(ele.value);
    }
    console.log(arrayOfEleVal);
    onClickOption(infoObj.modalCreateCode(arrayOfEleVal), infoObj);
    setIsOpen(false);
  }

  function createLabel(labelText: string) {
    return <label className='rounded-sm bg-primary text-secondary text-s'>{labelText}</label>;
  }

  function createInput(inputType) {
    return <textarea placeholder={inputType} className='w-full text-xs p-1 h-fit outline-none resize-none focus:outline-primary'/>;
  }
  
  function createSelect(options) {
    const allOptions = options.map((opt, index) => {
      return <option value={opt}>{opt}</option>;
    });
    return <select>{allOptions}</select>;
  }

  function createFormContent(arrOfForm) {
    const modalContent = arrOfForm.map((item, index) => {
      if (item.type === 'label') {
        return createLabel(item.labelText);
      } else if (item.type === 'input') {
        return createInput(item.inputType);
      } else if (item.type === 'select') {
        return createSelect(item.options);
      }
    });

    return (
      <div className='flex flex-col justify-center items-center'>
        <form id='modalForm' className='p-2 flex flex-col space-y-2 w-full'>{modalContent}</form>
        <div className='flex w-full justify-between'>
          <button
            className='rounded-lg p-1 mt-5 w-1/4 bg-gradient-to-b from-primary to-primaryDark text-secondary text-sm border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"'
            onClick={() => setIsOpen(false)}>
            Go Back
          </button>
          <button
            className='rounded-lg p-1 mt-5 w-1/4 bg-gradient-to-b from-primary to-primaryDark text-secondary text-sm border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"'
            onClick={() => createCode()}>
            Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='modal-overlay absolute inset-0 bg-secondary opacity-50'></div>
          <div className='modal-container bg-secondary border-2 border-primary w-96 mx-auto rounded shadow-lg z-50'>
            <div className='modal-content p-4'>
              {createFormContent(infoObj.modal)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DynamicModal;

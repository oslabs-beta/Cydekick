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
    return <label className='border border-primary'>{labelText}</label>;
  }

  function createInput(inputType) {
    return <input type={inputType} />;
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
      <div>
        <form id='modalForm'>{modalContent}</form>
        <div className='flex justify-between'>
          <button
            className='mt-4 bg-primary hover:bg-secondaryPrimary text-white py-2 px-4 rounded'
            onClick={() => setIsOpen(false)}>
            Close Modal
          </button>
          <button
            className='mt-4 bg-primary hover:bg-secondaryPrimary text-white py-2 px-4 rounded'
            onClick={() => createCode()}>
            Open Modal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='modal-overlay absolute inset-0 bg-gray-800 opacity-50'></div>
          <div className='modal-container bg-secondary w-96 mx-auto rounded shadow-lg z-50'>
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

import React, { useState, FormEvent } from 'react';
import { useMultistepForm } from './useMultiStepForm';
import DescribePage from './DescribePage';
import ItBlockPage from './ItBlockPage';

function TestGenContainer() {
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    setCurrentStepIndex,
  } = useMultistepForm([<DescribePage />, <ItBlockPage />, <div></div>]);
  return (
    <div className='w-screen h-screen '>
      <div className='w-3/5 h-2/5 border-2 border-green-400 rounded bg-slate-500'>
        {step}
      </div>
    </div>
  );
}

export default TestGenContainer;

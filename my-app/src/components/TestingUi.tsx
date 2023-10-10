// import React, { useState, FormEvent } from 'react';
// import { useMultistepForm } from './useMultiStepForm';
// import SelectAction from './SelectAction';

// type FormData = {
//   actionType: string;
//   selectedItem: string;
//   data1: string;
//   data2: string;
//   data3: string;
// };

// const INITIAL_DATA: FormData = {
//   actionType: '',
//   selectedItem: '',
//   data1: '',
//   data2: '',
//   data3: '',
// };

// const TestingUi = () => {
//   const [data, setData] = useState(INITIAL_DATA);
//   function updateFields(fields: Partial<FormData>) {
//     setData(prev => {
//       return { ...prev, ...fields };
//     });
//   }

//   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
//     useMultistepForm([
//       <SelectAction {...data} updateFields={updateFields} />,
//       <div></div>,
//       <SelectAction {...data} updateFields={updateFields} />,
//     ]);
//   function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     if (!isLastStep) return next();
//     alert('we gonna add an action');
//   }
//   return (
//     <div className='flex justify-end mr-10 border flex-col'>
//       <button className='bg-slate-600' onClick={() => console.log('clicked')}>
//         create new assertation
//       </button>
//       <button
//         className='bg-blue-600 ml-5'
//         onClick={() => console.log('clicked')}>
//         export test
//       </button>
//       <br></br>
//       <form onSubmit={onSubmit}>
//         <div className='border-cyan-400'>
//           {currentStepIndex + 1} / {steps.length}
//         </div>
//         {step}
//         <div className='mt-4 flex gap-2 justify-end'>
//           {!isFirstStep && (
//             <button type='button' onClick={back}>
//               Back
//             </button>
//           )}
//           <button type='submit'>{isLastStep ? 'finished' : 'Next'}</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TestingUi;

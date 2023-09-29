import React, { useState, FormEvent } from 'react';
import { useMultistepForm } from './useMultiStepForm';
import DescribePage from './DescribePage';
import ItBlockPage from './ItBlockPage';
import StatementPage from './StatementPage';

function TestGenContainer({currentComponent, currentHTML, currentTestId}) {
  const [currentPageNum, SetCurrentPageNum] = useState(0);
  const arrayOfReact = [
    <DescribePage SetCurrentPageNum={SetCurrentPageNum} />,
    <ItBlockPage SetCurrentPageNum={SetCurrentPageNum}/>,
    <StatementPage SetCurrentPageNum={SetCurrentPageNum} currentTestId={currentTestId} currentHTML={currentHTML} currentComponent={currentComponent} />,
  ];
  return (
      <div>
        {arrayOfReact[currentPageNum]}
      </div>
  );
}
export default TestGenContainer;

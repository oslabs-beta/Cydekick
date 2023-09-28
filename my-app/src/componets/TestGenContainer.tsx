import React, { useState, FormEvent } from 'react';
import { useMultistepForm } from './useMultiStepForm';
import DescribePage from './DescribePage';
import ItBlockPage from './ItBlockPage';
import StatementPage from './StatementPage';

function TestGenContainer() {
  const [currentPageNum, SetCurrentPageNum] = useState(0);
  const arrayOfReact = [
    <DescribePage SetCurrentPageNum={SetCurrentPageNum} />,
    <ItBlockPage SetCurrentPageNum={SetCurrentPageNum}/>,
    <StatementPage SetCurrentPageNum={SetCurrentPageNum}/>,
  ];
  return (
      <div>
        {arrayOfReact[currentPageNum]}
      </div>
  );
}
export default TestGenContainer;

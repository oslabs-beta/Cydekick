import React, { ReactElement, useState } from 'react';
import DescribePage from './DescribePage';
import ItBlockPage from './ItBlockPage';
import StatementPage from './StatementPage';
import { Tree } from './../types/Tree'

type TestGenContainerProps = {
  currentComponent: Tree,
  currentHTML: string,
  currentTestId: string,
}

function TestGenContainer({currentComponent, currentHTML, currentTestId}: TestGenContainerProps) {
  const [currentPageNum, setCurrentPageNum] = useState<number>(0);
  const arrayOfReact: ReactElement[] = [
    <DescribePage setCurrentPageNum={setCurrentPageNum} />,
    <ItBlockPage setCurrentPageNum={setCurrentPageNum}/>,
    <StatementPage setCurrentPageNum={setCurrentPageNum} currentTestId={currentTestId} currentHTML={currentHTML} currentComponent={currentComponent} />,
  ];
  return (
      <div>
        {arrayOfReact[currentPageNum]}
      </div>
  );
}
export default TestGenContainer;

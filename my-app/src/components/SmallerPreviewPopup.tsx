import React from 'react';
import MonacoEditor from 'react-monaco-editor';
const path = window.require('path')
const fs = window.require('fs');
const os = window.require('os');


type SmallerPreviewPopupProps = {
  code: string,
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const SmallerPreviewPopup: React.FC<SmallerPreviewPopupProps> = ({ code, setCode }) => {

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
    const filePath = path.join(os.tmpdir(), 'UserTests', 'TestBlock.cy.js');
    fs.writeFileSync(filePath, newValue);
  };



  return (
    <div className='bg-transparent p-2 h-full w-full'>
      <MonacoEditor
        width='100%'
        height='100%'
        language='javascript'
        theme='vs-dark'
        value={code}
        options={{
          selectOnLineNumbers: true,
          autoClosingQuotes: 'always',
          automaticLayout:true,
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default SmallerPreviewPopup


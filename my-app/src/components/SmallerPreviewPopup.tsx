import React from 'react';
import MonacoEditor from 'react-monaco-editor';



type SmallerPreviewPopupProps = {
  code: string,
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const SmallerPreviewPopup: React.FC<SmallerPreviewPopupProps> = ({ code, setCode, id }) => {

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };



  return (
    <div className='bg-transparent p-2 h-full w-full' id={id}>
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


import { Parser } from '../parser';

const GetFile = (props) => {
  function parseTree() {
    const file = document.getElementById('theInputFile').files[0];
    console.log(file.path);
    const DaParser = new Parser(file.path);
    console.log('parser created');
    DaParser.parse();
    console.log('tree parsed');
    console.log(DaParser.tree);
    props.setter(DaParser.tree);
    console.log('where the fuck is the console.log at');
  }

  return (
      <div className='w-50 rounded-lg p-1 hover: cursor-pointer' style={{backgroundColor: "#1DF28F"}}> 
      <label htmlFor='theInputFile' className='hover: cursor-pointer'>Choose File</label>
      <input data-cy='test' type='file' id='theInputFile' onChange={parseTree} className='hidden'/>
      </div>
  );
};

export default GetFile;

import SmallerPreviewPopup from './SmallerPreviewPopup';

function DescribePage() {
  return (
    <div className='relative'>
      <h1 className='ml-8'>Name for describe block:</h1>
      <input type='text' className='border border-neutral-950 ml-8' />
      <br></br>
      <button className='border border-neutral-950 ml-8'>
        Create describe block
      </button>
      <div className='absolute top-0 right-0'>
        <SmallerPreviewPopup />
      </div>
    </div>
  );
}
export default DescribePage;

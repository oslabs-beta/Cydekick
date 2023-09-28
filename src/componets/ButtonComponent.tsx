import React from 'react';
import PreviewPopup from './PreviewPopup';

const ButtonComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
      <button onClick={handleOpen}>Preview and Edit File</button>
      {open && <PreviewPopup onClose={handleClose} />}
      <button>Poop</button>
    </div>

  );
};

export default ButtonComponent;
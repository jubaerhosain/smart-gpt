import React, { useState } from "react";

const Modal = ({ onClose, pdfUrl }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <div className="modal-content">
        {/* <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="500px"
        /> */}
        <object data={pdfUrl} type="application/pdf" width="100%" height="100%" />
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect } from 'react';
import style from "./Modal.module.css";
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ src, alt, onClose }) => {

 const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [ onClose ]);

    return createPortal(
      <div className={style.modalBackdrob} onClick={handleClose}>
        <div className={style.modalContent}>
          <img src={src} alt={alt} />
        </div>
      </div>,
       modalRoot,
    );
  
};

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

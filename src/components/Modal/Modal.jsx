import React, { Component } from 'react';
import style from "./Modal.module.css";
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClose = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <div className={style.modalBackdrob} onClick={this.handleClose}>
        <div className={style.modalContent}>
          <img src={src} alt={alt} />
        </div>
      </div>,
       modalRoot,
    );
  }
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

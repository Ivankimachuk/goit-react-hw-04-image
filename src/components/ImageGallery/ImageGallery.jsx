import React from 'react';
import style from './ImageGallery.module.css';
import PropTypes from "prop-types";

const ImageGallery = ({ children }) => {
  
    return <ul className={style.gallery}>{children}</ul>;
};

export default ImageGallery;
  

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
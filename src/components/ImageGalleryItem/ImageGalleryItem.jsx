import React from 'react';
import style from './ImageGalleryItem.module.css'
import PropTypes from "prop-types";

const ImageGalleryItem = ({ src, alt, onClick }) => {
  
    return (
      <li className={style.galleryItem} onClick={onClick}>
        <img className={style.ImageGalleryItemImage} src={src} alt={alt} />
      </li>
    );
  
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

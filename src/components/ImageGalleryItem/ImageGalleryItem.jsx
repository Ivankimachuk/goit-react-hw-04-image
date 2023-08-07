import React, { Component } from 'react';
import style from './ImageGalleryItem.module.css'
import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
  render() {
    const { src, alt } = this.props;

    return (
      <li className={style.galleryItem} onClick={this.props.onClick}>
        <img className={style.ImageGalleryItemImage} src={src} alt={alt} />
      </li>
    );
  }
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import style from './ImageGallery.module.css';
import PropTypes from "prop-types";

export default class ImageGallery extends Component {
  render() {
    return <ul className={style.gallery}>{this.props.children}</ul>;
  }
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};


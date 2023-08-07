import React, { Component } from 'react';
import {Triangle} from 'react-loader-spinner';
import style from './Loader.module.css';

export default class CustomLoader extends Component {
  render() {
    return (
      <div className={style.loader}>
      <Triangle
              height="150"
              width="150"
              color="#3f51b5"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
            </div>
    );
  }
}
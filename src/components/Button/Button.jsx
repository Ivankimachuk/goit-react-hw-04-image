import React, { Component } from 'react';
import style from './Button.module.css';
import PropTypes from "prop-types";

export default class Button extends Component {
  render() {
    return (
      <div className={style.BtnContainer}>
        <button className={style.button} type="button" onClick={this.props.onClick} >
          {this.props.children}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

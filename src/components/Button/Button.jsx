import React from 'react';
import style from './Button.module.css';
import PropTypes from "prop-types";

const Button = ({ onClick, children }) => {
  
    return (
      <div className={style.BtnContainer}>
        <button className={style.button} type="button" onClick={onClick} >
          {children}
        </button>
      </div>
    );
  
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;

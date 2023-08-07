import React, { useState } from 'react';
import { FcSearch } from "react-icons/fc";
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';
import PropTypes from "prop-types";

const Searchbar = ({ onSubmit }) => {
const [ query, setQuery ] = useState('');


 const handleChange = (e) => {
    setQuery( e.target.value );
  };

 const handleSubmit = (e) => {
    e.preventDefault();
   
    if(query.trim() === '') {
      Notiflix.Notify.warning(`The search field is not filled !!!`)
      return;
    }
    onSubmit(query);
    setQuery('');

  };

    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={handleSubmit}>
          <button type="submit" className={style.button}>
            <FcSearch size={30}/>
          </button>

          <input
            className={style.input}
            type="text"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder='Search images and photos'
          />
        </form>
      </header>
    );
  
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
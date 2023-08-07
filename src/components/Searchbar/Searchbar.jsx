import React, { Component } from 'react';
import { FcSearch } from "react-icons/fc";
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    
    if(query.trim() === '') {
      Notiflix.Notify.warning(`The search field is not filled !!!`)
      return;
    }
    onSubmit(query);
    this.setState({ query: '' });

  };

  render() {
    const { query } = this.state;

    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.button}>
            <FcSearch size={30}/>
          </button>

          <input
            className={style.input}
            type="text"
            value={query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder='Search images and photos'
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};










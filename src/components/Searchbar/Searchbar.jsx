import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    pictureQuery: PropTypes.func.isRequired,
  };
  state = {
    inputValue: '',
  };

  handleInput = ({ currentTarget }) => {
    const fixedInput = currentTarget.value;
    this.setState({ inputValue: fixedInput });
  };
  handleSubmit = event => {
    event.preventDefault();
    const fixedInput = this.state.inputValue.trim();
    if (fixedInput) {
      this.props.pictureQuery(fixedInput);
    } else {
      alert('Please type your query.');
    }
  };
  // inputKeyDown = event => {
  //   const { inputValue, hitsPerPage } = this.state;
  //   if (event.code === 'Enter') {
  //     this.fetchPictures({ inputValue, hitsPerPage });
  //   }
  // };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}></span>
          </button>

          <input
            className={css.SearchForm_input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

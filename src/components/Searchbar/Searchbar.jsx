import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';

class SearchBar extends Component {
  state = {
    name: '',
  };

  handleChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.name);
  };
  
  render() {
    return (
      <header className={css.Searchbar} type="submit">
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button
            disabled={this.state.name.length === 0}
            type="submit"
            className={css.SearchForm_button}
          >
            <span className={css.SearchForm_button_label}>
              <BsSearch size="22px" />
            </span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

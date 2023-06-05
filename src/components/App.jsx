import React, { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    name: '',
  };
  formSubmitHandler = evt => {
    this.setState({ name: evt });
  };
  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.formSubmitHandler} />
        <ImageGallery name={this.state.name} />
      </div>
    );
  }
}

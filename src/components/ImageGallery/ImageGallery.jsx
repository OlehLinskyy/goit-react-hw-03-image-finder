import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
    user: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.name !== this.props.name ||
      prevState.page !== this.state.page
    ) {
      prevProps.name !== this.props.name && this.setState({ articles: [] });
      this.setState({ isLoading: true });
      setTimeout(async () => {
        try {
          if (prevProps.name !== this.props.name) {
            this.state.articles = [];
            this.state.page = 1;
          }
          const { name } = this.props;
          const { page } = this.state;

          const response = await axios.get(
            `https://pixabay.com/api/?q=${name}&page=${page}&key=35665373-98cf5b8f6eeff8ca0cc84fee2&image_type=photo&orientation=horizontal&per_page=12`
          );
          if (this.state.page === 1) {
            this.setState({ articles: [...response.data.hits] });
          } else {
            this.setState({
              articles: [...this.state.articles, ...response.data.hits],
            });
          }
        } catch (error) {
          this.setState({ error });
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }, 1000);
    }
  }

  clickPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  largeImageURL = (image, user) => {
    this.setState({ largeImageURL: image, user: user });
  };

  submitArticles = () => {
    this.setState({ articles: [] });
  };

  render() {
    const { articles, isLoading, showModal, largeImageURL, user } = this.state;
    return (
      <>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            articles={articles}
            largeImageURL={largeImageURL}
            user={user}
          />
        )}
        <ul className={css.ImageGallery}>
          <ImageGalleryItem
            largeImage={this.largeImageURL}
            articles={articles}
            toggleModal={this.toggleModal}
          />
        </ul>
        {isLoading && <Loader />}
        {this.state.articles.length >= 12 && (
          <Button clickPages={this.clickPage} />
        )}
      </>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  name: PropTypes.string.isRequired,
};

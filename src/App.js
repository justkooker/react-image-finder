import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import imageFetch from './services/api-service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Spiner from './Loader';
import './ImageFinder.css';

class ImageFinder extends Component {
  static defaultProps = {
    initialImages: [],
    initialCurrentPage: 1,
    initialsearchQuery: '',
    initialShowModal: false,
    initialModalImage: '',
    initialIsLoading: false,
  };
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object.isRequired),
    currentPage: PropTypes.number,
    searchQuery: PropTypes.string,
    modalImage: PropTypes.string,
  };
  state = {
    images: this.props.initialImages,
    currentPage: this.props.initialCurrentPage,
    searchQuery: this.props.initialsearchQuery,
    modalImage: this.props.initialModalImage,
    showModal: this.props.initialShowModal,
    isLoading: this.props.initialIsLoading,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.addImages();
    }
    if (prevState.images.length !== this.state.images.length) {
      this.smoothScroll();
    }
  }
  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  addImages = () => {
    const { searchQuery, currentPage } = this.state;
    const fetchOptions = {
      searchQuery,
      currentPage,
    };
    this.setState({ isLoading: true });

    setTimeout(() => {
      imageFetch(fetchOptions)
        .then(images => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            currentPage: prevState.currentPage + 1,
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
    }, 2000);
    this.smoothScroll();
  };
  loadMoreImages = () => {
    this.addImages();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  openModal = e => {
    this.state.images.map(image => {
      if (e.target.src === image.webformatURL) {
        this.setState({ modalImage: image.largeImageURL });
      }
      this.toggleModal();
    });
  };
  smoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  render() {
    const { images, showModal, modalImage, isLoading } = this.state;
    return (
      <>
        <Searchbar onChangeQuery={this.onChangeQuery} />
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={this.openModal} />
        )}
        {isLoading === true && <Spiner />}
        {isLoading === false && (
          <Button loadMore={this.loadMoreImages} images={images} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageFinder;

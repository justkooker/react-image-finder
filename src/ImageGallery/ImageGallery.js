import React from 'react';
import { PropTypes } from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';
const ImageGallery = ({ images, onClick }) => {
  return (
    <ul onClick={onClick} className={styles.gallery}>
      <ImageGalleryItem images={images} />
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  onClick: PropTypes.func,
};

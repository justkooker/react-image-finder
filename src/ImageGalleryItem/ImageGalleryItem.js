import React from 'react';
import styles from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ images }) =>
  images.map(({ id, webformatURL, tags }) => (
    <li key={id} className={styles.galleryItem}>
      <img src={webformatURL} alt={tags} />
    </li>
  ));
export default ImageGalleryItem;

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEsc);
    window.addEventListener('click', this.closeModalClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
    window.removeEventListener('click', this.closeModalClick);
  }
  closeModalEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  closeModalClick = e => {
    if (e.target.nodeName !== 'IMG') {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={styles.overlay}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
export default Modal;

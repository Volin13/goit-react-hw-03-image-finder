import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modalRoot');

export class Modal extends Component {
  static propTypes = {
    pictures: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  state = {
    pictures: this.props.pictures,
    modalImageId: this.props.modalImageId,
    modalPicture: this.props.pictures[this.props.modalImageId].largeImageURL,
    modalPictureAlt: this.props.pictures[this.props.modalImageId].tags,
    loading: true,
  };

  componentDidMount(pictures) {}

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // };

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalPicture, pictureAlt, modalImageId } = this.state;
    console.log({ modalImageId });
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img className="modalImg" src={modalPicture} alt={pictureAlt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

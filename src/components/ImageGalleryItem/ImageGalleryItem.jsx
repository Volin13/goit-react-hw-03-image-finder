import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, id, tags, onImageClick }) => (
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItem_image}
      src={webformatURL}
      alt={tags}
      onClick={() => onImageClick(id)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

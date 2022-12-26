import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Button, Modal } from '../index';
import { ColorRing } from 'react-loader-spinner';
import fetchPictures from '../../services/picturesAPI';
import css from './Image.Gellery.module.css';

const perPage = 12;

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    notify: PropTypes.func.isRequired,
  };

  state = {
    pictures: [],
    page: 1,
    totalPages: 0,
    loading: false,
    showModal: false,
    modalImageId: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = prevProps;
    const { query } = this.props;
    const { page: prevPage } = prevState;
    const { page } = this.state;
    if (query !== prevQuery) {
      try {
        this.setState({ loading: true });
        const { hits, totalHits } = await fetchPictures(query, 1);
        if (!hits.length) {
          this.props.notify("Can't find anything");
        }
        this.setState({
          pictures: [...hits],
          totalPages: Math.ceil(totalHits / perPage),
          page: 1,
        });
      } catch (error) {
        alert('Error!');
      } finally {
        this.setState({
          loading: false,
        });
      }
    } else if (page !== prevPage && page > 1) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetchPictures(query, page);
        this.setState({ pictures: [...prevState.pictures, ...hits] });
      } catch (error) {
        this.props.notify(`The search is complited`);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  openModal = pictureId => {
    const modalId = this.state.pictures.findIndex(({ id }) => id === pictureId);
    this.setState({
      modalImageId: modalId,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { pictures, loading, page, totalPages, showModal, modalImageId } =
      this.state;
    return (
      <>
        {loading && (
          <ColorRing
            visible={true}
            height="400"
            width="400"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass={css.loader}
            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
          />
        )}
        <ul className={css.ImageGallery}>
          {pictures.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              onImageClick={this.openModal}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
        </ul>
        {page < totalPages && (
          <Button onClick={this.handleLoadMoreBtnClick} disabled={loading} />
        )}
        {showModal && (
          <Modal
            pictures={pictures}
            closeModal={this.closeModal}
            modalImageId={modalImageId}
          ></Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;

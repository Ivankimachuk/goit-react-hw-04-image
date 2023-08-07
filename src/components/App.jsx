import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import Triangle from './Loader/Loader';
import receivingImages from './services/api';

const IMAGES_PER_PAGE = 12;
document.title = 'HMK-3 iMAGE'

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    modalImage: '',
    modalOpen: false,
    loading: false,
  };

  componentDidMount() {
    this.receivingImages();
  }

  componentDidUpdate() {
    const { modalOpen } = this.state;

    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }
    

  receivingImages = async () => {
    const { query, page } = this.state;

    if (!query) return;

    this.setState({ loading: true });

    try {
      const newImages = await receivingImages(query, page);

      if (newImages.length === 0) {
        Notiflix.Notify.info('Nothing was found for this query!');
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...newImages],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = (searchQuery) => {
    this.setState({ query: searchQuery, page: 1, images: [] }, this.receivingImages);
  };

  handleLoadMoreClick = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.receivingImages);
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ modalImage: largeImageURL, showModal: true, modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImage: '', modalOpen: false });
  };

  render() {
    const { images, showModal, modalImage, loading } = this.state;
    const totalImages = images.length;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={`Pixabay image ${image.id}`}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>

        {totalImages > 0 && !loading && totalImages % IMAGES_PER_PAGE === 0 && (
          <Button onClick={this.handleLoadMoreClick}>Load more</Button>
        )}

        {showModal && <Modal src={modalImage} alt="Large image" onClose={this.handleCloseModal} />}

        {totalImages === 0 && !showModal && loading && <Triangle />}
      </div>
    );
  }
}

export default App;


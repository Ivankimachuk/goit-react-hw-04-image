import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import Triangle from './Loader/Loader';
import receivingImages from './services/api';

document.title = 'HMK-4 Image';
const IMAGES_PER_PAGE = 12;

const App = () => {

const [ images, setImages ] = useState([]);
const [ query, setQuery ] = useState('');
const [ page, setPage ] = useState(1);
const [ showModal, setShowModal ] = useState(false);
const [ modalImage, setModalImage ] = useState('');
const [modalOpen, setModalOpen] = useState(false);
const [ loading, setLoading ] = useState(false);

useEffect(() => {
  const  fetchImages = async () => {

    if (!query)
      return;

    setLoading(true);

    try {
      const newImages = await receivingImages(query, page);

      if (newImages.length === 0) {
        Notiflix.Notify.info('Nothing was found for this query!');
      }

      setImages((prevImages) => [...prevImages, ...newImages]);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };
  fetchImages();
}, [ query, page ]);

useEffect(() => {
  if (modalOpen) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
  }, [modalOpen]);



  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };
    

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setModalImage(largeImageURL);
    setShowModal(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalImage('');
    setShowModal(false);
    setModalOpen(false);
  };

    const totalImages = images.length;

    return (
      <div className="App">
        <Searchbar onSubmit={handleSearchSubmit} />
        
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={`Pixabay image ${image.id}`}
              onClick={() => handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>

        {totalImages > 0 && !loading && totalImages % IMAGES_PER_PAGE === 0 && (
          <Button onClick={handleLoadMoreClick}>Load more</Button>
        )}

        {showModal && <Modal src={modalImage} alt="Large image" onClose={handleCloseModal} />}

        {totalImages === 0 && !showModal && loading && <Triangle />}
      </div>
    );
  
}

export default App;

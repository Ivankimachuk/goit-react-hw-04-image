import axios from "axios";
import Notiflix from "notiflix";

const API_KEY = '37681157-cf2a0984d19e57970fb41f251';
const BASE_URL = 'https://pixabay.com/api/';

const receivingImages = async ( query, page ) => {
  try{
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data.hits.map((image) => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
    }));
  } catch ( error ) {
    console.error(Notiflix.Notify.failure(`Error fetching images`), error);
    throw error;
  }
};

export default receivingImages;

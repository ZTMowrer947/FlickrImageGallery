// Imports
import axios from 'axios';
import Photo from '../models/Photo';

// Response type
interface ApiPhoto {
    id: string;
    farm: number;
    secret: string;
    server: string;
    title: string;
}

interface FetchPhotosResponse {
    photos: {
        photo: ApiPhoto[];
    };
}

// Service
async function fetchPhotos(tag: string): Promise<Photo[]> {
    // Make API request
    const response = await axios.get<FetchPhotosResponse>(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_KEY}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
    );

    // Get photos from response
    const { photo: photos } = response.data.photos;

    // Map API photos into app photos
    return photos.map(photo => ({
        id: photo.id,
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        title: photo.title,
    }));
}

// Export
export default fetchPhotos;

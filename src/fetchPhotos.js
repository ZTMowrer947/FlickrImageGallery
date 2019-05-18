// Imports
import axios from "axios";

// Function
const fetchPhotos = async (apiKey, tag) => {
    const response =
        await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`);

    if (response.status >= 400) {
        throw new Error(`Got ${response.status} ${response.statusText} from Flickr`);
    } else {
        return response.data.photos;
    }
};

// Exports
export default fetchPhotos

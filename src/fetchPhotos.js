// Imports
import axios from "axios";

// Function
const fetchPhotos = async (apiKey, tag) => {
    // Get photo data using axios
    const response =
        await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`);

    // If the response indicates an error,
    if (response.status >= 400) {
        // Throw an error indicating the failure
        throw new Error(`Got ${response.status} ${response.statusText} from Flickr`);
    } else {
        // Otherwise, return photo data
        return response.data.photos;
    }
};

// Exports
export default fetchPhotos

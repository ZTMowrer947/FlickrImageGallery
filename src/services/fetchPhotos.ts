// Imports
import axios from "axios";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Photo } from "../store/gallery/types";

// Response type
interface FetchPhotosResponse {
    photos: {
        photo: Photo[];
    };
}

// Photo fetching service
const fetchPhotos = (tag: string): Observable<Photo[]> => {
    return from(
        axios.get<FetchPhotosResponse>(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_KEY}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
        )
    ).pipe(map(response => response.data.photos.photo));
};

// Export
export default fetchPhotos;

// Imports
import axios from "axios";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Photo } from "../store/gallery/types";

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

// Photo fetching service
const fetchPhotos = (tag: string): Observable<Photo[]> => {
    // Convert axios response into observable
    return from(
        axios.get<FetchPhotosResponse>(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_KEY}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
        )
    ).pipe(
        // Extract photo data
        map(response => response.data.photos.photo),

        // Map API Photo data into app form
        map(apiPhotos =>
            apiPhotos.map<Photo>(photo => ({
                id: photo.id,
                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                title: photo.title,
            }))
        )
    );
};

// Export
export default fetchPhotos;

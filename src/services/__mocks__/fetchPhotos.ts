// Imports
import { of, Observable } from "rxjs";
import { Photo } from "../../store/gallery/types";

// Mock implementation
const fetchPhotos = (tag: string): Observable<Photo[]> => {
    // Generate photo data
    const photos: Photo[] = [];
    for (let i = 0; i < 10; i++) {
        const id = Buffer.from(tag)
            .toString("hex")
            .concat(Date.now().toString(16), i.toString(16));

        photos.push({
            id,
            title: `Test Photo ${i + 1}`,
            url: "http://placehold.it/200x200",
        });
    }

    // Return observable containing photo data
    return of(photos);
};

// Export
export default fetchPhotos;

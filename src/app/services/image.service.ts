import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileData } from '../models/fileData';
import { HttpBaseService } from '../core/services/httpbase.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ImageService extends HttpBaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    saveReviewImages(files: FileData[]) {
        const formData = new FormData();
        files.forEach(element => {
            formData.append('api_key', '486637256548783');
            formData.append('tags', 'review_images');
            formData.append('upload_preset', 'xnrcoduq');
            formData.append('file', element.img);
        });
        return this.httpClient.post('https://api.cloudinary.com/v1_1/ajaybhasy/upload', formData, { reportProgress: true }).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

}

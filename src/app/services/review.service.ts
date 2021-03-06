import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { AppConfigService } from '../core/services/app-config.service';
import { map, catchError, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { Product } from '../models/product';
import { HttpBaseService } from '../core/services/httpbase.service';
import { Review } from '../models/review';

@Injectable()
export class ReviewService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.reviewdb;
    }

    saveReview(review: Review) {
        const url = `${this.baseUrl}/reviews`;
        return this.httpClient.post(url, review).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    getProductReviews(productId): Observable<Review[]> {
        const url = `${this.baseUrl}/reviews/${productId}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    saveImages(formData) {
        return this.httpClient.post('https://api.cloudinary.com/v1_1/ajaybhasy/upload', formData, { reportProgress: true }).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    getUserProductReview(productId, userId) {
        const url = `${this.baseUrl}/${userId}/reviews/${productId}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }
    getReviewsByCategory(catId:string,limit:number): Observable<Review[]> {
        const url = `${this.baseUrl}/reviewsByCategory/${catId}/${limit}`;
        console.log(url);
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }
}

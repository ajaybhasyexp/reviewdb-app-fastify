import { HttpBaseService } from '../core/services/httpbase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../core/services/app-config.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class ProductService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.reviewdb;
    }

    getProducts(search): Observable<Product[]> {
        const url = `${this.baseUrl}/products/${search}`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    getProductById(id): Observable<Product> {
        const url = `${this.baseUrl}/${id}/products`;
        return this.httpClient.get(url).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { AppConfigService } from '../core/services/app-config.service';
import { map, catchError, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { Product } from '../models/product';
import { HttpBaseService } from '../core/services/httpbase.service';

@Injectable()
export class SearchService extends HttpBaseService {
    private baseUrl = '';

    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.reviewdb;
    }

    search(terms: Observable<string>) {
        return terms.pipe(debounceTime(400), distinctUntilChanged(), switchMap(term => this.searchEntries(term)));
    }

    searchEntries(term): Observable<Product[]> {
        if (term) {
            const url = `${this.baseUrl}/products/${term}`;
            return this.httpClient.get(url).pipe(
                map(this.extractData),
                catchError(this.handleError));
        }
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { AppConfigService } from '../core/services/app-config.service';
import { map, catchError, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { HttpBaseService } from '../core/services/httpbase.service';
import { User } from '../models/user';

@Injectable()
export class UserService extends HttpBaseService {
    private baseUrl = '';
    constructor(
        private httpClient: HttpClient,
        private environmentService: AppConfigService) {
        super();
        this.baseUrl = this.environmentService.environment.api.reviewdb;
    }

    saveUser(user: User) {
        const url = `${this.baseUrl}/users`;
        return this.httpClient.post(url, user).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }
}

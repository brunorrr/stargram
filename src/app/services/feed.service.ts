import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { PaginableReturn } from '../models/paginable-return';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FeedService {

    constructor(private httpClient: HttpClient) {}

    feedFeed(offset: string, limit: number): Observable<Post[]> {
        return this.httpClient.get<PaginableReturn<Post[]>>(`${environment.backendUrl}api/feed/2`,
        {
            params: {
                offset: offset,
                limit: `${limit}`
            }
        })
        .pipe(
            map(response => response.data),
            catchError( err => of(err))
        );
    }
    
}
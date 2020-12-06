import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginableReturn } from '../models/paginable-return';
import { Post } from '../models/post';

@Injectable()
export class FeedService {

    constructor(private httpClient: HttpClient) {}

    feedFeed(offset: string, size: number): PaginableReturn<Post[]> {
        this.httpClient.get()
    }
    
}
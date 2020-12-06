import { Paginable } from './paginable';

export interface PaginableReturn<T> {
    data: T;
    paginable: Paginable;
    links: any;
}
import { Author } from './author';
import { PostData } from './post-data';

export interface Post {
    author: Author;
    data: PostData;
}
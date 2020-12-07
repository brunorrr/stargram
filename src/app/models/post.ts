import { Author } from './author';
import { PostData } from './post-data';
import { PostType } from './post-type.enum';

export interface Post {
    author: Author;
    data: PostData;
    type: PostType;
}
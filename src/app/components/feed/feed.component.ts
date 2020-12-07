import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostType } from 'src/app/models/post-type.enum';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];

  offSet: string = '';
  readonly feedSize: number = 3;
  readonly postType = PostType;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.feedFeed();
  }

  private feedFeed(): void {
    this.feedService.feedFeed(this.offSet, this.feedSize).subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }

}

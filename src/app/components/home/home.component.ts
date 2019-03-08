import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
// import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from '../../../../node_modules/angular-star-rating/src/';

import { Post } from '../../models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  protected posts: Array<Post>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(res => this.posts = res);
  }

  getRating(post: Post): number {
    const ratingArr = post.rating.map(item => item.stars);
    let total = 0;
    for (const value of ratingArr) {
      total += value;
    }
    const currentRating = total / ratingArr.length;
    return currentRating;
  }

}

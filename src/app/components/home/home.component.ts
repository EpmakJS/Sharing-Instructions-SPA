import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
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

}

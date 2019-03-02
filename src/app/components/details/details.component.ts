import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/Post';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  protected post: Post;

  constructor(private postService: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {

      const id: string = params.id;

      this.postService.getPost(id)
        .subscribe(res => this.post = res);
    });
  }

}

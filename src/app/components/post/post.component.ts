import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  protected posts: Array<Post>;
  protected postForm: FormGroup;

  constructor(private postService: PostService, fb: FormBuilder, private router: Router) {

    this.postForm = fb.group({
      title : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(75)])],
      description : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])]
    });

  }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(res => this.posts = res);
  }

  addPost(post: Post) {
    this.postService.insertPost(post)
      .subscribe(newPost => {
        this.posts.push(newPost);
        this.router.navigateByUrl('/');
      });
  }

}

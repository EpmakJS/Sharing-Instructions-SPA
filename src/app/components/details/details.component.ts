import { Component, OnInit, HostListener } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {

      const id: string = params.id;

      this.postService.getPost(id)
        .subscribe(res => this.post = res);
    });
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }

  scrollFunction() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          document.getElementById('toTop').style.display = 'block';
      } else {
          document.getElementById('toTop').style.display = 'none';
      }
  }

}

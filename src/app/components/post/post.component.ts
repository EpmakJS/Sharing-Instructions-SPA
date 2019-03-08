import { Component, OnInit, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/Post';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/models/Rating';
import { Step } from 'src/app/models/Step';
import { Image } from 'src/app/models/Image';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  posts: Array<Post>;
  postForm: FormGroup;
  editingStatus = false;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    if ('id' in this.activatedRoute.snapshot.params) {
      this.editingStatus = true;
    }
  }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(res => this.posts = res);

    if (this.editingStatus) {
      this.activatedRoute.params.subscribe(params => {

        const id: string = params.id;

        this.postService.getPost(id)
          .subscribe(res => this.post = res);
      });
      this.initForm(this.post);
    } else {
      this.initForm();
    }
  }

  initForm(post?: Post) {
    let title: string = null;
    let description: string = null;
    let image: string = null;
    let rating: Array<Rating>;

    if (post) {
      title = post.title;
      description = post.description;
      image = post.image;
      rating = post.rating;
    } else {
      title = null;
      description = null;
      image = null;
      rating = null;
    }

    const steps: FormArray = new FormArray([]);

    this.postForm = this.formBuilder.group({
      title : [title, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(75)])],
      description : [description, Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(500)])],
      image : [image, Validators.required],
      steps,
      rating : [rating]
    });

    if (!post) {
      this.addStep();
      this.addImage(0);
    } else {
      post.steps.forEach((step, stepIndex) => {
        this.addStep(step);
        step.img.forEach((imgRef) => {
          this.addImage(stepIndex, imgRef);
        });
      });
    }
  }

  addStep(step?: Step) {
    const img = new FormArray([]);
    const head = step ? step.head : null;
    const body = step ? step.body : null;

    (this.postForm.controls.steps as FormArray).push(
      new FormGroup ({
        head : new FormControl(head, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(75)])),
        body : new FormControl(body, Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(500)])),
        img
      })
    );
  }

  addImage(stepIndex: number, image?: Image) {
    const src = image ? image.src : null;

    (((this.postForm.controls.steps as FormArray)
      .controls[stepIndex] as FormGroup).controls.img as FormArray).push(
        new FormGroup({
          src: new FormControl(src, Validators.required)
        })
      );
  }

  addPost(post: Post) {
    this.postService.insertPost(post)
      .subscribe(newPost => {
        this.posts.push(newPost);
        console.log(newPost);
        this.router.navigateByUrl('/');
      });
  }

}

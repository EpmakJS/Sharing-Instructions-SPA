import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from '../../models/Post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  protected result: any;
  private postsUrl = '/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>('/api/details/' + id);
  }

  insertPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, JSON.stringify(post), httpOptions);
  }

}

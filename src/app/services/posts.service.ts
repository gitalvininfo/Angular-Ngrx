import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://ngrx-9b709-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            console.log(data[key])
            posts.push({ ...data[key], id: key })
          }

          return posts;
        })
      );
  }


  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`https://ngrx-9b709-default-rtdb.firebaseio.com/posts.json`, post);
  }

  updatePost(post: Post) {
    const postData = {
      [post.id]: { title: post.title, description: post.description }
    }
    return this.http.patch(`https://ngrx-9b709-default-rtdb.firebaseio.com/posts.json`, postData);
  }

  deletePost(id: string) {
    return this.http.delete(`https://ngrx-9b709-default-rtdb.firebaseio.com/posts/${id}.json`)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';
import { Post } from '../models/Post';
import { UiService } from './ui.service';
import { Community } from '../models/Community';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postSubject: Subject<Post> = new Subject<Post>();
  public post$ = this.postSubject.asObservable();

  private postsSubject: Subject<Post[]> = new Subject<Post[]>();
  public posts$ = this.postsSubject.asObservable();

  private url: string = 'http://localhost:8080/api/post';
  public postUrl: string = 'http://localhost:8080/api/post/create';

  constructor(private http: HttpClient, private ui: UiService) {
    this.getAllPosts();
   }

  public prepareFormData(post: Post): FormData {
    // Preparing the post {} and the image[] to be sent to the backend
    const formData = new FormData();
    
    formData.append(
      'post',
      new Blob([JSON.stringify(post)], { type: 'application/json' })  
    );
    for(let i = 0; i < post.image.length; i++) {
      formData.append('imageFile', post.image[i].file, post.image[i].file.name);
    }
    return formData;
  }

  //Create
  public createPost(post: FormData, communityName: String): void{
    console.log('userID : ',this.ui.currentUserId);
    console.log('Community Sent!', communityName)
    //TODO: Need to handle currentUserId - NULL.
    this.http.post<Post>(`${this.postUrl}/${this.ui.currentUserId}/b/${communityName}`, post)
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Post created successfully');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //Read
  public getAllPosts(): void{
    this.http.get<Post[]>(`${this.url}`)
    .subscribe({
      next: (posts) => {
        console.log('POST FROM SERVICE: ',posts);
        this.postsSubject.next(posts);
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting posts');
      }
    })
  }

  //Update

  //Delete
}

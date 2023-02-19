import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';
import { Post } from '../models/Post';
import { UiService } from './ui.service';
import { PageName } from '.././enums/PageEnum';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  pageName = PageName;
  private postSubject: Subject<Post> = new Subject<Post>();
  public post$ = this.postSubject.asObservable();
  public currentPostId: number = localStorage.getItem('currentPostId') ? Number(localStorage.getItem('currentPostId')) : 0;

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

  public onPostSelection(post: number): void {
    this.getPostById(post);
    this.ui.changePage(PageName.POST_VIEW);
  }
  // TODO: Need to add Comment to posts
  // TODO: Need to add upvote/downvote to posts logic
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

  public votePost(postId: number, vote: number): void{
    this.http.post(`${this.url}/vote/${postId}/${vote}`, null)
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Vote successful');
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

  public getPostById(post: number): void{
    this.http.get<Post>(`${this.url}/id/${post}`)
    .pipe(take(1))
    .subscribe({
      next: (post) => {
        this.postSubject.next(post);
        localStorage.setItem('currentPostId', JSON.stringify(post.id));
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting post');
      }
    })
  }

  //Update

  //Delete
}

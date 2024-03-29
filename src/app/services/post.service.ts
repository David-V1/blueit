import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, Subject, tap, take, map } from 'rxjs';
import { Post } from '../models/Post';
import { UiService } from './ui.service';
import { PageName } from '.././enums/PageEnum';
import { CommentService } from './comment.service';
import { Comment } from '../models/Comment';

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

  private postIdSubject: Subject<number> = new Subject();
  public userPostId$ = this.postIdSubject.asObservable();

  private url: string = 'http://localhost:8080/api/post';
  public postUrl: string = 'http://localhost:8080/api/post/create';

  constructor(private http: HttpClient, private ui: UiService, private commentService: CommentService) {
    this.getAllPosts();
    const currPage = Number(localStorage.getItem("page"))
    if (currPage === this.pageName.POST_VIEW) {
      this.commentService.getCommentsByPostId(this.currentPostId); // persisting comments on refresh when selected a post
    }
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

  public onPostSelection(postId: number): void {
    const currPage = Number(localStorage.getItem("page"));
    if (currPage === this.pageName.POST_VIEW) return; // prevent unnecessary calls
    this.currentPostId = postId;
    this.getPostById(postId);
    this.commentService.getCommentsByPostId(postId);
    this.ui.changePage(PageName.POST_VIEW);
  }
  // TODO: Need to add Comment to posts
  //TODO: Handle are you sure no images to post.
  //Create
  public createPost(post: FormData, communityName: String): void {
    if (communityName === 'undefined') return this.ui.onError('Please select a community');
    
    this.http.post<Post>(`${this.postUrl}/${this.ui.currentUserId}/b/${communityName}`, post)
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Post created successfully');
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error creating post');
      }
    })
  }

  public votePost(userId: string, postId: number, voteType: string): void{
    this.http.post(`${this.url}/vote/${userId}/${postId}/${voteType}`, null)
    .subscribe({
      next: () => {
        this.getPostById(postId);
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error voting');
      }
    })
  }
  //TODO: circular DI moved to post.service.ts
  public addComment(comment: Comment, postId:number, userId: string): void{
    console.log('addComment Comment:', comment,'POSTID *', postId, 'USERID',userId)
    this.http.post<Comment>(`http://localhost:8080/api/comments/post/${postId}/user/${userId}`, comment)
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Comment created successfully');
        this.getPostById(this.currentPostId);
        this.commentService.getCommentsByPostId(postId) // postid coming from
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error creating comment');
      }
    })
  }

  //Read
  public getAllPosts(): void{
    this.http.get<Post[]>(`${this.url}`)
    .subscribe({
      next: (posts) => {
        this.postsSubject.next(posts);
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting posts');
      }
    })
  }

  public getPostById(postId: number): void{
    this.http.get<Post>(`${this.url}/id/${postId}`)
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

  public getPostLikes(postId: number): Observable<number>{
    return this.http.get<number>(`${this.url}/likes/${postId}`)
  }

  public getPostsByCommunityId(communityId: number): void{
    this.http.get<Post[]>(`${this.url}/community/${communityId}`)
    .subscribe({
      next: (posts) => {
        console.log('posts', posts)
        // this.postsSubject.next(posts);
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting posts');
      }
    })
  }



  // Declarative 
  userPosts$ = this.posts$.pipe(
    map(posts => posts.filter((post: Post) => post.user!.id === this.ui.currentUserId)),
    tap(x => console.log(x))
  )

  //Update

  //Delete
}

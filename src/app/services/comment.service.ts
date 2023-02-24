import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';
import { Comment } from '../models/Comment';
import { UiService } from './ui.service';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = 'http://localhost:8080/api/comments';

  private commentSubject: Subject<Comment> = new Subject<Comment>();
  public comment$ = this.commentSubject.asObservable();

  private commentsSubject: Subject<Comment[]> = new Subject<Comment[]>();
  public comments$ = this.commentsSubject.asObservable();

  constructor(private http: HttpClient, private ui: UiService, private postService: PostService) { }

  //Create
  public addComment(comment: Comment, postId:number, userId: string): void{
    this.http.post<Comment>(`${this.url}/post/${postId}/user/${userId}`, comment)
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Comment created successfully');
        this.postService.getPostById(this.postService.currentPostId);
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error creating comment');
      }
    })
  }


  //Read
  public getCommentsByPostId(postId: number): void{
    this.http.get<Comment[]>(`${this.url}/post/${postId}`)
    .subscribe({
      next: (comments) => {
        console.log(comments)
        this.commentsSubject.next(comments);
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting comments');
      }
    })
  }


  //Update

  //Delete
}

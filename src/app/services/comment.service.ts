import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap, take, tap } from 'rxjs';
import { Comment } from '../models/Comment';
import { UiService } from './ui.service';
import { PostService } from './post.service';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url: string = 'http://localhost:8080/api/comments';

  public currentPostId: number = localStorage.getItem('currentPostId') ? Number(localStorage.getItem('currentPostId')) : 0; // added due to DI cycle w/ PostService

  private commentSubject: Subject<Comment> = new Subject<Comment>();
  public comment$ = this.commentSubject.asObservable();

  private commentsSubject: Subject<Comment[]> = new Subject<Comment[]>();
  public comments$ = this.commentsSubject.asObservable();

  private userCommentsSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public getUserComments = this.userCommentsSubject.asObservable();

  constructor(private http: HttpClient, private ui: UiService) { 
   }

  //Create
  public voteComment(userId: string, commentId: number, vote: string): void {
    this.http.post<Comment>(`${this.url}/vote/${userId}/${commentId}/${vote}`, null)
    .subscribe({
      next: () => {
        this.getCommentsByPostId(this.currentPostId);
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error voting comment');
      }
    })
  }


  //Read
  public gettAllComments(): void {
    this.http.get<Comment[]>(`${this.url}`)
    .pipe(take(1))
    .subscribe({
      next: () => {
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting comments');
      }
    })
  }

  public getCommentsByPostId(postId: number): void {
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

  // Declarative
  userComments$ = this.getUserComments.pipe(
    switchMap(() => this.http.get<Comment[]>(`${this.url}/user/${this.ui.currentUserId}`)))
      .pipe(
        tap(comments => console.log(comments)),
        catchError(err => of(err))
      );

  //Update

  //Delete
}

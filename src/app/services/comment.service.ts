import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take } from 'rxjs';
import { Comment } from '../models/Comment';
import { UiService } from './ui.service';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = 'http://localhost:8080/api/comments';

  private commentSubject: Subject<Comment> = new Subject<Comment>();
  public comment$ = this.commentSubject.asObservable();

  private commentsSubject: Subject<Comment[]> = new Subject<Comment[]>();
  public comments$ = this.commentsSubject.asObservable();

  constructor(private http: HttpClient, private ui: UiService) {
   }

  //Create
  public voteComment(userId: string, commentId: number, vote: string): void {
    console.log(userId, commentId, vote)
    this.http.post<Comment>(`${this.url}/vote/${userId}/${commentId}/${vote}`, null)
    .subscribe({
      next: () => {
        console.log('Voted comment');
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error voting comment');
      }
    })
  }


  //Read
  public gettAllComments(): void{
    this.http.get<Comment[]>(`${this.url}`)
    .pipe(take(1))
    .subscribe({
      next: (comments) => {
        console.log(comments)
      },
      error: (err) => {
        console.log(err);
        this.ui.onError('Error getting comments');
      }
    })
  }

  public getCommentsByPostId(postId: number): void{
    this.http.get<Comment[]>(`${this.url}/post/${postId}`)
    .subscribe({
      next: (comments) => {
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

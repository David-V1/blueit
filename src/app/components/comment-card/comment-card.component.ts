import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import {Comment} from 'src/app/models/Comment'
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  comments$: Observable<Comment[]> | undefined;

  constructor(public ui: UiService, public commentService: CommentService ,public postService: PostService) {
  }
  ngOnInit(): void {
    //sort comments by likes
    this.comments$ = this.commentService.comments$
    .pipe(
      map((comments: Comment[]) => {
        //TODO: sort check for null
        console.log('from RxJs map', comments)
        return comments.sort((a, b) =>  b.likes - a.likes)
      }))
  }

  dateDuration(dateString:string) {
    const date = moment(dateString, 'DD-MM-YYYY HH:mm:ss');
    return date.fromNow();
  }
  
  onVote(event: Event, comment:Comment ) {
    if(event){
      this.commentService.voteComment(this.ui.currentUserId!, comment.id!, 'true')
    } else {
      this.commentService.voteComment(this.ui.currentUserId!, comment.id!, 'false')
    }
    
  }

}

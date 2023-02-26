import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import {Comment} from 'src/app/models/Comment'
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {

  constructor(public ui: UiService, public commentService: CommentService ,public postService: PostService) { }

  dateDuration(dateString:string) {
    const date = moment(dateString, 'DD-MM-YYYY HH:mm:ss');
    return date.fromNow();
  }
  

}

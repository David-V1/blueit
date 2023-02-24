import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import {Comment} from '../../models/Comment'
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  comment = {} as Comment;

  constructor(public ui: UiService, public postService: PostService) { }

  public onCommentSubmit(){ 
    this.postService.addComment(this.comment, this.postService.currentPostId, this.ui.currentUserId!);
  }

  commentTest() {

    this.postService.getCommentsByPostId(this.postService.currentPostId);
    this.postService.comment$.subscribe((data) => {
      console.log(data);
    });
  }

}

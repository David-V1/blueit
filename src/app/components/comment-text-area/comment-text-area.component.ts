import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { UiService } from 'src/app/services/ui.service';
import {Comment} from 'src/app/models/Comment'

@Component({
  selector: 'app-comment-text-area',
  templateUrl: './comment-text-area.component.html',
  styleUrls: ['./comment-text-area.component.scss']
})
export class CommentTextAreaComponent {
  comment = {} as Comment;

  constructor(public ui: UiService, public commentService: CommentService ,public postService: PostService) {
    this.postService.getPostById(this.postService.currentPostId)
   }

   public onCommentSubmit(){ 
    this.postService.addComment(this.comment, this.postService.currentPostId, this.ui.currentUserId!);
    this.comment = {} as Comment;
  }

}

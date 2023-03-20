import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import {Comment} from 'src/app/models/Comment'
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  comment = {} as Comment;

  constructor(public ui: UiService, public commentService: CommentService ,public postService: PostService) {
    this.postService.getPostById(this.postService.currentPostId)
   }
  //TODO: BUG, when adding the a comment and then voting on own comment, it will return comments from other posts except the current post
  public onCommentSubmit(){ 
    this.postService.addComment(this.comment, this.postService.currentPostId, this.ui.currentUserId!);
  }
  //TODO: Reset the comment input to '' after submit
  commentTest() {
    this.commentService.getCommentsByPostId(this.postService.currentPostId);
    this.commentService.comment$.subscribe((data) => {
      console.log(data);
    });
  }

}

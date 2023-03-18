import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
  @Input() userPost: any; // [{...}, {...}] array of post objects
  showComments: boolean = false;
  numberOfComments: number = 0;

  constructor(public postService: PostService, public commentService: CommentService) {
   }
   // Need to get number after class initialization for html elemnents to be rendered. Do not
   //refactor to observable$
  ngOnInit(): void {
    this.commentService.getNumberOfComments(this.userPost.id).subscribe((num: number) => {
      this.numberOfComments = num;
    })
  }

  postDuration(dateString: string) {
    const date = moment(dateString, 'DD-MM-YYYY HH:mm:ss');
    return date.fromNow();
  }

  showCommentsToggle(postId: number) {
    this.commentService.getNumberOfComments(postId);
    this.showComments = !this.showComments;
  }


}

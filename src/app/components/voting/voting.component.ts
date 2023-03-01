import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent {
  @Input() numberVotes: number = 0;
  @Output() voteClick = new EventEmitter();

  constructor(public postService: PostService, public ui: UiService, public commentService: CommentService) { }

  public onUpVote() {
    this.voteClick.emit(true);
  }

  public onDownVote() {
    this.voteClick.emit(false);
  }
}

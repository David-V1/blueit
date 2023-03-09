import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from 'src/app/enums/PageEnum';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  pageName = PageName;
  @Input() post: any = {} as any; // PostDTO

  constructor(public ui: UiService, public postService: PostService) {}

  postDuration(dateString: string) {
    const date = moment(dateString, 'DD-MM-YYYY HH:mm:ss');
    return date.fromNow();
  }

  onVote(event: Event) {
    if(event){
      this.postService.votePost(this.ui.currentUserId!, this.post.id, 'true');

    } else{
      this.postService.votePost(this.ui.currentUserId!, this.post.id, 'false');
    }
  }

  checkHomePage(): boolean{
    const currPage = Number(localStorage.getItem("page"))
    if (currPage !== this.pageName.HOME) return true;
    return false;
  }
  
}

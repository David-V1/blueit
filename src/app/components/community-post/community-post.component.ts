import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { CommunityService } from 'src/app/services/community.service';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.component.html',
  styleUrls: ['./community-post.component.scss']
})
export class CommunityPostComponent {
  @Input() communityPost: any;

  constructor(public communityService: CommunityService, public postService: PostService) {

   }

   postDuration(dateString: string) {
    const date = moment(dateString, 'DD-MM-YYYY HH:mm:ss');
    return date.fromNow();
  }


  test(c: any){
    console.log('test ran!', c);
    // this.postService.getPostsByCommunityId(this.communityPost.id);
  }
}

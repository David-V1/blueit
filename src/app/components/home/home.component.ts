import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from 'src/app/enums/PageEnum';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { CommunityService } from 'src/app/services/community.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pageName = PageName;
  constructor(public ui: UiService, public postService: PostService, public c:CommunityService, public u: UserService) {
    this.postService.getAllPosts();
   }

  //  TESTING BUTTON
  test() {
    // this.c.getCommunity();
  }

}

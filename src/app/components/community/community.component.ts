import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from 'src/app/enums/PageEnum';
import { UserService } from 'src/app/services/user.service';
import { CommunityService } from 'src/app/services/community.service';
import { Community } from 'src/app/models/Community';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  pageName = PageName;
  communityInputData = {} as Community;

  constructor(public ui: UiService, public userService: UserService, public communityService: CommunityService) { }
    
  public onCancel() {
    this.userService.showAddCommunity = false;
  }

  public onAddCommunity() {
    if (!this.ui.currentUserId) {
      this.ui.onError('error creating assigning admin to community');
      return;
    }
    this.communityService.createCommunity(this.communityInputData, this.ui.currentUserId);
    this.userService.showAddCommunity = false;
  }
}

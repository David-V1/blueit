import { Component, Input, OnDestroy } from '@angular/core';
import { Community } from 'src/app/models/Community';
import { CommunityService } from 'src/app/services/community.service';
import { UiService } from 'src/app/services/ui.service';
import { UserCommunityService } from 'src/app/services/user-community.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from 'src/app/models/FileHandler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-page-header',
  templateUrl: './community-page-header.component.html',
  styleUrls: ['./community-page-header.component.scss']
})
export class CommunityPageHeaderComponent implements OnDestroy {
  @Input() community: any;
  communityLogo = {} as Community;
  isMember = false;
  memberSubscription: Subscription;

  constructor(public communityService: CommunityService, public userCommunity: UserCommunityService, public ui: UiService ,private sanitizer: DomSanitizer) {
    this.memberSubscription = this.userCommunity.isMemberObservable$.subscribe(member => this.isMember = member);  
   }

  public onLogoUpload(event: any): void {
    console.log('onLogoUpload RAN!',event)
    if (event.currentFiles) {
      const file = event.currentFiles[0];
      const fileHandle: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.communityLogo.logo = fileHandle;
    }
  }
  public addNewLogo(): void {
    this.communityService.addCommunityLogo(this.communityLogo);
  }

  public onJoinCommunity(community: Community): void {
    if (this.isMember) {
      this.userCommunity.leaveCommunity(community);
    } 
    this.userCommunity.joinCoummunity(community);
   
  }

  // TODO: add a random background color to the community. Once intialized, the color should not change. 
  ngOnDestroy(): void {
    this.memberSubscription.unsubscribe();
  }
}

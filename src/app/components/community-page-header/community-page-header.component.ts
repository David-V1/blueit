import { Component, Input } from '@angular/core';
import { Community } from 'src/app/models/Community';
import { CommunityService } from 'src/app/services/community.service';
import { UiService } from 'src/app/services/ui.service';
import { UserCommunityService } from 'src/app/services/user-community.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from 'src/app/models/FileHandler';

@Component({
  selector: 'app-community-page-header',
  templateUrl: './community-page-header.component.html',
  styleUrls: ['./community-page-header.component.scss']
})
export class CommunityPageHeaderComponent {
  @Input() community: any;

  constructor(public communityService: CommunityService, private userCommunity: UserCommunityService, public ui: UiService ,private sanitizer: DomSanitizer) { }

  public onLogoUpload(event: any): void {
    if (event.currentFiles) {
      const file = event.currentFiles[0];
      const fileHandle: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.community.logo = fileHandle;
    }
  }
  //TODO: POST image logo to the wrong community. It is posting to the last community in the list
  public addNewLogo(community: Community): void {
    this.communityService.addCommunityLogo(this.community);
  }

  public onJoinCommunity(community: Community): void {
    this.userCommunity.joinCoummunity(community);
  }

}

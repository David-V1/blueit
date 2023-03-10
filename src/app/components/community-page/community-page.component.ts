import { Component } from '@angular/core';
import { Community } from 'src/app/models/Community';
import { CommunityService } from 'src/app/services/community.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from 'src/app/models/FileHandler';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent {
  community = {} as Community;

  constructor(public communityService: CommunityService, private sanitizer: DomSanitizer, public ui: UiService) {}
  //TODO: grab the community Object and send that to the BE. This way it will have the community.log: FileHandler Object {file, url}
  public onLogoUpload(event: any): void {
    if (event.currentFiles) {
      const file = event.currentFiles[0];
      const fileHandle: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.community.logo = fileHandle;
      console.log('onLogoUpload', this.community);
    }
  }

  public addNewLogo(community: Community): void {
    console.log(community)
    // if (!community.logo) {
    //   console.log('Please select a logo');
    //   return;
    // }
    this.communityService.addCommunityLogo(this.community);
    console.log(community);
  }
  test(c: Community){
    console.log('test')
    console.log(c);
    console.log(this.community);
  }

}

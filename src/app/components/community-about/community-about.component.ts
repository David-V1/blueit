import { Component, Input } from '@angular/core';
import { Community } from 'src/app/models/Community';
import { CommunityService } from 'src/app/services/community.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-community-about',
  templateUrl: './community-about.component.html',
  styleUrls: ['./community-about.component.scss']
})
export class CommunityAboutComponent {
  @Input() community = {} as Community;
  descriptionClicked = false;

  constructor(public communityService: CommunityService, public ui: UiService) { }

  public onDescriptionClick() {
    this.descriptionClicked = true;
  }
  public onDescriptionBlur() {
    this.descriptionClicked = false;
  }
}

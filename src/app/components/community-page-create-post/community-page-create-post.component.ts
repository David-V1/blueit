import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from 'src/app/enums/PageEnum';

@Component({
  selector: 'app-community-page-create-post',
  templateUrl: './community-page-create-post.component.html',
  styleUrls: ['./community-page-create-post.component.scss']
})
export class CommunityPageCreatePostComponent {
  pageName = PageName;
  constructor(public ui: UiService) {}
}

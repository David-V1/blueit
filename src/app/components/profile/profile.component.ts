import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from 'src/app/enums/PageEnum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  pageName = PageName;
  file: File | null = null;

  constructor(public uiService: UiService) { }
  // TODO: Need to add pictures to profile
  //TODO: CRUD for profile
  storeFile(event: Event){}
}

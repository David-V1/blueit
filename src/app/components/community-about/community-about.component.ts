import { Component, Input } from '@angular/core';
import { Community } from 'src/app/models/Community';
import { CommunityService } from 'src/app/services/community.service';
import { UiService } from 'src/app/services/ui.service';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';

@Component({
  selector: 'app-community-about',
  templateUrl: './community-about.component.html',
  styleUrls: ['./community-about.component.scss'],
  providers: [ConfirmationService]
})
export class CommunityAboutComponent {
  @Input() community = {} as Community;
  descriptionClicked = false;

  constructor(public communityService: CommunityService, public ui: UiService,private confirmationService: ConfirmationService) { }

  public onDescriptionClick() {
    this.descriptionClicked = true;
  }
  public onDescriptionBlur(event: any) {
    // FocusEvent doesnt have a relatedTarget property id 
    if (event.relatedTarget !== null && event.relatedTarget.id === 'cancelDescription') {
      event.stopPropagation();
      this.onCancel();
      console.log('onDescriptionBlur', event.relatedTarget.id)
    } else if (event.target.value) {
        event.stopPropagation();
        this.confirm1();
      } else {
        this.community.description = '';
        this.descriptionClicked = false;
      }
  }
  
  public onCancel(): void {
    this.community.description = '';
    this.descriptionClicked = false;
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure yyou want to discard current description?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.onCancel();
        },
        reject: () => {
          return;
          }
    });
  }

}

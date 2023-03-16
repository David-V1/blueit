import { Component, Input, OnDestroy } from '@angular/core';
import { Community } from 'src/app/models/Community';
import { CommunityService } from 'src/app/services/community.service';
import { UiService } from 'src/app/services/ui.service';
import {ConfirmationService} from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-about',
  templateUrl: './community-about.component.html',
  styleUrls: ['./community-about.component.scss'],
  providers: [ConfirmationService]
})
export class CommunityAboutComponent implements OnDestroy{
  @Input() community = {} as Community;
  descriptionClicked = false;
  originalDescription = '';
  descriptionSubscription: Subscription;
  chars: number = 0;

  constructor(public communityService: CommunityService, public ui: UiService,private confirmationService: ConfirmationService) {
    this.descriptionSubscription = this.communityService.selection$.subscribe((community: Community) => {
      this.originalDescription = community.description;
    });

   }

  public onDescriptionClick() {
    this.descriptionClicked = true;
  }
  public onDescriptionBlur(event: any) {
    // FocusEvent doesnt have a relatedTarget property id 
    if (event.relatedTarget !== null && event.relatedTarget.id === 'cancelDescription') {
      event.stopPropagation();
    } 
    else if( event.relatedTarget !== null && event.relatedTarget.id === 'saveDescription') {
      event.stopPropagation();
    } 
    else if (event.target.value !== '' && event.target.value !== this.originalDescription) {
      console.log('else if RAN');
        event.stopPropagation();
        this.confirm1();
      } 
      else {
        this.descriptionClicked = false;
      }
  }
  
  public onCancel(): void {
    this.community.description = this.originalDescription;
    this.descriptionClicked = false;
  }
  
  public onSave(id:number): void {
    if (!id) {
      console.error('No id');
      return;
    }
    this.communityService.addDescription(id, this.community.description);
    this.descriptionClicked = false;
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to discard current description?',
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

  public countChars(): number {
    if (!this.community.description) {
      return 0;
    }
    this.chars = this.community.description.length;
    const maxChars = 500;
    return maxChars - this.chars;
  }

  test() {
    this.countChars();
  }

  ngOnDestroy(): void {
    this.descriptionSubscription.unsubscribe();
  }

}

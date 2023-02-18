import { Component, OnDestroy, EventEmitter, Output } from '@angular/core';
import {DropdownFilterOptions} from 'primeng/dropdown';
import { CommunityService } from 'src/app/services/community.service';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from '../.././enums/PageEnum';
import { Community } from 'src/app/models/Community';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-community-search',
  templateUrl: './community-search.component.html',
  styleUrls: ['./community-search.component.scss']
})
export class CommunitySearchComponent implements OnDestroy{
  public PageName = PageName;
  communities: Community[] = [];
  @Output() selectionEvent = new EventEmitter<Community>(); // whole community object returned
  selectedCommunity: Community = {} as Community;
  filterValue = '';
  communitySubscription: Subscription;

  constructor(public ui: UiService, public communityService: CommunityService) {
    this.communitySubscription = this.communityService.communities$.subscribe(communityService => this.communities = communityService);
    this.communityService.getAllCommunities();
   }

   onCommunitySelection(event: any) {
    this.selectedCommunity = event.value;
    this.selectionEvent.emit(this.selectedCommunity);
   }
  
  ngOnDestroy(): void {
    this.communitySubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { User } from 'src/app/models/User';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PageName } from 'src/app/enums/PageEnum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [MessageService]
})
export class NavigationComponent implements OnInit, OnDestroy {
  PageName = PageName;
  searchValue: string = '';
  navMenuItems: MenuItem[] = [];
  menuSubscription: Subscription;

  public constructor(
    public ui: UiService,
    public userService: UserService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService) {
      this.menuSubscription = this.userService.menu$.subscribe(menuItems => {
        this.navMenuItems = menuItems;
      });
    }

    ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  //TODO: Need to add current page status to the navigation bar

  public onHomeBtnClick() {
    localStorage.removeItem('currentPostId');
    this.ui.changePage(PageName.HOME);
  }

  public showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
      this.messageService.clear('c');
  }
  
  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }

}

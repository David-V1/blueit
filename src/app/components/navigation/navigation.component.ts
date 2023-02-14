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
  loginData = {} as User;
  newAccountData = {} as User;
  searchValue: string = '';
  displayLogin: boolean = false;
  displayCreateAccount: boolean = false;
  navMenuItems: MenuItem[] = [];
  username: string = localStorage.getItem('username')!;
  loggedInMenuItems: MenuItem[] = [];
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

  public onLogin() {
    this.userService.getUserByEmailAndPassword(this.loginData.email, this.loginData.password);
    this.userService.displayLogin = false;
    this.resetLoginFields();

  }

  public onSingup() {
    this.showInfo();
    this.userService.createUser(this.newAccountData);
    this.displayCreateAccount = false
    this.resetLoginFields();
  }

  public showLogin() {
    this.userService.displayLogin = true;
    this.displayCreateAccount = false;
  }

  public showSignup() {
    this.userService.displayLogin = false;
    this.displayCreateAccount = true;
  }

  public resetLoginFields(){
    this.loginData = {} as User;
    this.newAccountData = {} as User;
  }


  // PrimeNG Toast //@Component level:providers: [MessageService]
  public showInfo() {
    this.messageService.add({severity:'info', summary: 'Account Created!', detail: `Welcome ${this.newAccountData.username}!`});
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

import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  loginData = {} as User;
  newAccountData = {} as User;
  displayCreateAccount: boolean = false;

  constructor(public userService: UserService,private messageService: MessageService) { }

  public onLogin() {
    this.userService.getUserByEmailAndPassword(this.loginData.email, this.loginData.password);
    this.userService.displayLogin = false;
    this.resetLoginFields();
  }

  public resetLoginFields(){
    this.loginData = {} as User;
    this.newAccountData = {} as User;
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
  

}

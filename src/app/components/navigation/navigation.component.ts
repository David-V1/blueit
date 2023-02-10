import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  loginData = {} as User;
  newAccountData = {} as User;
  searchValue: string = '';
  displayLogin: boolean = false;
  displayCreateAccount: boolean = false;

  public constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public showBasicDialog() {
    this.displayLogin = true;
  }

  public onLogin() {
    console.log(this.loginData);
    this.displayLogin = false;
    this.resetLoginFields();
  }

  public onSingup() {
    console.log(this.newAccountData);
    this.displayCreateAccount = false
    this.resetLoginFields();
  }

  public showLogin() {
    this.displayLogin = true;
    this.displayCreateAccount = false;
  }

  public showSignup() {
    this.displayLogin = false;
    this.displayCreateAccount = true;
  }

  public resetLoginFields(){
    this.loginData = {} as User;
  }

}

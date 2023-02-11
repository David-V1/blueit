import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { UiService } from './ui.service';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8080/api/user';
  public currentUser = {} as User;
  public username: string = '';
  displayLogin: boolean = false;

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
  public user$ = this.userSubject.asObservable();

  private menuSubject = new BehaviorSubject<MenuItem[]>(this.activeMenuItem());
  public menu$ = this.menuSubject.asObservable();

  constructor(public ui: UiService, public http:HttpClient) {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const username = localStorage.getItem('username'); // for nav name display
    if (email !== null && password !== null) {
      this.username = username!;
      this.getUserByEmailAndPassword(email, password);
    }
   }

  public updateMenu(menuItems: any[]) {
    this.menuSubject.next(menuItems);
  }

  public onLogout(): void {
    this.ui.onLogout();
    this.userSubject.next(this.currentUser);
    this.updateMenu(this.activeMenuItem());
  }

  public showBasicDialog() {
    this.displayLogin = true;
  }

  //Create
  public createUser(newUser: User): void{
    this.http.post<User>(this.url, newUser)
    .pipe(take(1))
    .subscribe({
      next: user => {
        this.userSubject.next(user);
        this.ui.openSnackBar(`Welcome ${user.username}!`);
      },
      error: err => {
        console.error(err);
        this.ui.onError(err);
      }
    });
  }

  //Reactive Nav Menu
  public activeMenuItem(): MenuItem[] {
    const currentLogStatus = localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn')!) : false;
    return currentLogStatus ? 
    [{
      label: `${this.currentUser.username}`,
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New Post',
          icon: 'pi pi-fw pi-plus',
        },
        {
          label: 'My Profile',
          icon: 'pi pi-fw pi-user-edit',
        },
        {
          separator: true
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.onLogout();

          }
        }
      ]
    }] :
    [{
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      command: () => {
        this.showBasicDialog();
      }
    }]
  }

  //Read
  public getUserByEmailAndPassword(email: string, password: string): void{
    this.http.get<User>(`${this.url}/email/${email}/pass/${password}`)
    .pipe(take(1))
    .subscribe({
      next: user => {
        this.currentUser = user;
        this.ui.onValidLogin(user);
        this.userSubject.next(user);
        this.activeMenuItem();
        this.updateMenu(this.activeMenuItem());
      },
      error: err => {
        console.error(err);
        this.ui.onError(err);
      }
    });
  }

  //Update

  //Delete

}

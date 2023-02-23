import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { UiService } from './ui.service';
import { MenuItem } from 'primeng/api';
import { PageName } from '../enums/PageEnum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8080/api/user';
  public currentUser = {} as User;
  public username: string = '';
  displayLogin: boolean = false;
  showAddCommunity: boolean = false;

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
  public user$ = this.userSubject.asObservable();

  private menuSubject = new BehaviorSubject<MenuItem[]>(this.activeMenuItem());
  public menu$ = this.menuSubject.asObservable();

  constructor(public ui: UiService, public http:HttpClient) {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const username = localStorage.getItem('username'); // for nav name display
    //TODO: Check this logic  . Returning NULL
    if (email !== null && password !== null) {
      this.username = username!;
      this.getUserByEmailAndPassword(email, password);
      // this.getUserById(this.ui.currentUserId!);
    }
   }

  public updateMenu(menuItems: any[]) {
    this.menuSubject.next(menuItems);
  }

  public onLogout(): void {
    this.ui.onLogout();
    this.userSubject.next(this.currentUser);
    this.updateMenu(this.activeMenuItem()); // change view to login
    this.ui.changePage(PageName.HOME);

  }

  public showBasicDialog() {
    this.displayLogin = true;
  }

  public showAddCommunityForm() {
    this.showAddCommunity = true;
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
          label: 'My Profile',
          icon: 'pi pi-fw pi-user-edit',
          command: () => {
            this.ui.changePage(PageName.PROFILE);
          }
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
    },
    {
      label: 'New Post',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.ui.changePage(PageName.POST);
      }
    },
    {
      label: 'Community',
      icon: 'pi pi-fw pi-reddit',
      items: [
        {
          label: 'Create Community',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.showAddCommunityForm();
          }
        }
      ]
    }
  // Else Not logged in so show this:
  ] :
    [{
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      command: () => {
        this.showBasicDialog();
      }
    }]
  }

  public prepareProfilePicForm(user: User): FormData {
    const formData = new FormData();
    // formData.append('id', user.id!.toString());
    // formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('imageFile', user.profilePic!.file, user.profilePic!.file.name);
    return formData;
  }

    //Create
    public createUser(newUser: User): void{
      this.http.post<User>(this.url, newUser)
      .pipe(take(1))
      .subscribe({
        next: user => {
          this.userSubject.next(user);
          // if (user.username) {this.ui.openSnackBar(`Welcome ${user.username}!`);}
        },
        error: err => {
          console.error(err);
          this.ui.onError(err);
        }
      });
    }

    public addProfilePic(user: User): void {
    const formData = this.prepareProfilePicForm(user);
    this.http.post<User>(`${this.url}/${user.id}`, formData)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.ui.openSnackBar(`Profile picture updated!`);
      },
      error: err => {
        console.error(err);
        this.ui.onError(err);
      }
    });
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

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  public getUserById(id: string): void{
    this.http.get<User>(`${this.url}/u/id/${id}`)
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

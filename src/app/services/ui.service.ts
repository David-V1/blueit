import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/User';
import { PageName } from '../enums/PageEnum';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  pageName: Number | null = null;
  isLoggedIn: boolean = false;
  currentUsername: string = localStorage.getItem('username') ? localStorage.getItem('username')! : '';
  currentUserId: string = localStorage.getItem('id')!;

  constructor(public http: HttpClient, private _snackBar: MatSnackBar ) {
    localStorage.getItem("page") ? this.pageName = Number(localStorage.getItem("page")) : this.pageName = 0;
   }

   public changePage(page: number): void {
    localStorage.setItem("page", page.toString());
    this.pageName = page
  }


  public onValidLogin(loginData: User): void {
    this.isLoggedIn = true;
    localStorage.setItem('email', loginData.email);
    localStorage.setItem('password', loginData.password);
    localStorage.setItem('id', loginData.id!.toString());
    localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
    localStorage.setItem('username', loginData.username);
  }

  public onLogout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
    localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
  }

  public onError(msg: string): void {
    this._snackBar.open(msg, undefined, {
      duration: 3000
    })
  }

  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, "close", {
      duration: 4000
    })
  }
}

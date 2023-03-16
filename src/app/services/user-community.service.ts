import { Injectable } from '@angular/core';
import { UserCommunity } from '../models/UserCommunity';
import { HttpClient } from '@angular/common/http';
import { Community } from '../models/Community';
import { UserService } from './user.service';
import { take } from 'rxjs';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class UserCommunityService {
  url: string = 'http://localhost:8080/api/u_community';

  constructor(private ui: UiService, private http: HttpClient) { }

  // Create
  public joinCoummunity(community: Community): void {
    const user = this.ui.currentUserId;
    this.http.post<void>(`${this.url}/join_community/u/${user}/b/${community.id}`, null).pipe(take(1))
    .subscribe({
      next: () => {
      this.ui.openSnackBar('Joined Community');
    },
    error: () => {
      this.ui.onError('Failed to join community');
    }})
  }

  // Read

  // Update

  // Delete
}

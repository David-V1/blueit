import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.scss']
})
export class ProfileCommentsComponent {
  @Input() userComments: any = [];

  
}

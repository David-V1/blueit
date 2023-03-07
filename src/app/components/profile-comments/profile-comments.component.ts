import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.scss']
})
export class ProfileCommentsComponent {
  @Input() userComments: any = [];

  
}

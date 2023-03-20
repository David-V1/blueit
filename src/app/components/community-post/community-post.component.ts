import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.component.html',
  styleUrls: ['./community-post.component.scss']
})
export class CommunityPostComponent {
  @Input() post: any;

}

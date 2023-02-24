import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  constructor(public ui: UiService) { }

}

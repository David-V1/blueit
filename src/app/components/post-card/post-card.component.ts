import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { PageName } from 'src/app/enums/PageEnum';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  pageName = PageName;
  @Input() post: any = {} as any; // PostDTO
  postLikes: number = 0;

  constructor(public ui: UiService, public postService: PostService) {}

  onImgClick(){
    console.log('image clicked')
  }

  test(){
    console.log('post',this.post);
    console.log('post.postImages',this.post.postImages);
    
  }
}

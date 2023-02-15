import { Component } from '@angular/core';
import { UiService } from '../.././services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { PageName } from '../.././enums/PageEnum';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from 'src/app/models/FileHandler';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import {DropdownFilterOptions} from 'primeng/dropdown';

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  public PageName = PageName;
  value1: string = 'off';
  stateOptions: any[] = []; // for select button
  titleText: string = 'Title';
  text: string = '';
  textArea: string = 'Text (Optional)';
  changeTextArea: boolean = false;
  uploadedFiles: any[] = [];
  countries: any[];
  selectedCountry: City = {name: 'Select a Country', code: ''};

  filterValue = '';

  newPost: Post = {
    id: null,
    title: '',
    likes: 0,
    date: new Date(),
    content: '',
    image: []
  }

  constructor(public ui: UiService, public userService: UserService, private postService:PostService, private sanitizer: DomSanitizer) {
    this.stateOptions = [
      { label: 'Post',
        value: 'POST',
        icon: 'pi pi-book'
      },
      { label: 'Images or Video', 
        value: 'IMG',
        icon: 'pi pi-fw pi-image' },
    ];
    // communites dummy data
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
  ];
   }
   
   myResetFunction(options: DropdownFilterOptions) {
    this.filterValue = '';
}

   public showImgOrVideo() {
      if (this.value1 === 'IMG') {
        this.changeTextArea = true;
      }
      if (this.value1 === 'POST') {
        this.changeTextArea = false;
      }
    }
    public onUpload(event: any) {
      // Array of selected files
      let i: number = event.currentFiles.length - 1;

      if (event.currentFiles){
        const file = event.currentFiles[i];
        // prepare my IMG type POST ready for multipart/form-data
        const fileHandle: FileHandler = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        }
        // It is now ready to be adjoined with my POST Object
        this.newPost.image.push(fileHandle);
      }
    }

    public postNewPost() {
      // Now we need to configure so it will comply with the BE MediaType.MULTI_FORM_DATA_VALUE
      let postData = this.postService.prepareFormData(this.newPost);
      this.postService.createPost(postData)
    }
} 
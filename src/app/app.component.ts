import { Component } from '@angular/core';
import { UiService } from './services/ui.service';
import { PageName } from './enums/PageEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blueit';
  public PageName = PageName;

  constructor(public ui: UiService) { }
}

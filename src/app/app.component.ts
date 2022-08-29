import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ef';
  isCodeCollapsed = false;
  isDataCollapsed = true;
  isDocumentationCollapsed = false;
  view: string = 'history';

    show(view: string){
      if(view == 'history'){
        this.view = 'history';
      }
      else if(view == 'code'){
        this.view = 'code';
      }
    }
}



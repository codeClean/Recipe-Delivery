import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppRoot from './store/app.reducer';
import * as fromAuthAction from './login/store/auth.action';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromAppRoot.AppState>,
              @Inject(PLATFORM_ID) private platformId) {}

  ngOnInit() {
    // root component. tries automatically to login in every reload
    if (isPlatformBrowser(this.platformId)) {
      console.log('inside  platform browser');
      this.store.dispatch( new fromAuthAction.AutoLogin());
    }
    
    console.log('out of platform browser');
    
  }
}

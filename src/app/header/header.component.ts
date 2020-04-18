import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromAppRoot from '../store/app.reducer';
import * as fromAuthAction from '../login/store/auth.action';
import * as recipeAction from '../recipe/store/recipe.action';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    @Output() emitFeature = new EventEmitter<string>();
    isLoggedIn = false;
    loginSubscription: Subscription;
    fetchSubscription: Subscription;

    userEmail = null;
    notify = false;
    notifyMessage = '';

    onSelect(feature: string) {
        this.emitFeature.emit(feature);
        // console.log(feature + ' is selected' );
    }

    constructor(private dataServ: DataStorageService,
                private routActive: ActivatedRoute,
                private router: Router,
                private store: Store<fromAppRoot.AppState>) { }

    ngOnInit() {
      //  this.loginSubscription = this.logSer.user.subscribe(user => {
        this.loginSubscription = this.store.select('authState').pipe(map(authuser => authuser.user)).subscribe(user => {
            this.isLoggedIn = !!user; // if user exist true else false;
            if (this.isLoggedIn) {
                this.userEmail = user.email;
            }
        });
    }

    saveRecipe() {
        this.store.dispatch( new recipeAction.StoreRecipe());
        this.dataServ.saveRecipe();
    }
    fetchRecipe() {

        this.store.dispatch( new recipeAction.FeatchRecipe());
       /* const result =  this.dataServ.fetchRecipe().subscribe(response => {
           console.log(response);
           this.notifyMessage = ' you have ' + response.length + ' recipe/s ';
           this.notify = true;
           setTimeout(() => {
               this.notify = false;
           }, 5000);
       }); */
     }
    onLogout() {
        //this.logSer.onLogOut();
        this.store.dispatch( new fromAuthAction.UserLogout());
        console.log('loging out');
    }
     ngOnDestroy() {
         if (this.loginSubscription) {
             this.loginSubscription.unsubscribe();
         }
         if (this.fetchSubscription) {
            this.fetchSubscription.unsubscribe();
         }
    }

    onAccount() {

        this.router.navigate(['account']);

    }
    myrecipe() {
       console.log('my recipe ');

      // this.recipeServ.onGetPrivateRecipe();
      // this.router.navigateByUrl('/myrecipe');

      // this.router.navigate(['myrecipe'],{relativeTo:});
    }
}

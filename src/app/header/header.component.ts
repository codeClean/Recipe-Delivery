import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromAppRoot from '../store/app.reducer';
<<<<<<< HEAD
import * as AuthAction from '../login/store/auth.action';
=======
import * as fromAuthAction from '../login/store/auth.action';
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
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
<<<<<<< HEAD
        // this.dataServ.saveRecipe();
=======
        this.dataServ.saveRecipe();
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
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
<<<<<<< HEAD
     onMyRecipes(){
         const username = JSON.parse(localStorage.getItem('userData')).email;
         this.store.dispatch( new recipeAction.FilterMyRecipe(username));
         this.router.navigate(['/recipe']);
     }
     onAllRecipes(){
        this.store.dispatch( new recipeAction.FeatchRecipe());
        this.router.navigate(['/recipe']);
     }
    onLogout() {
        //this.logSer.onLogOut();
        this.store.dispatch( new AuthAction.UserLogout());
=======
    onLogout() {
        //this.logSer.onLogOut();
        this.store.dispatch( new fromAuthAction.UserLogout());
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
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
<<<<<<< HEAD
    
=======
    myrecipe() {
       console.log('my recipe ');

      // this.recipeServ.onGetPrivateRecipe();
      // this.router.navigateByUrl('/myrecipe');

      // this.router.navigate(['myrecipe'],{relativeTo:});
    }
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
}

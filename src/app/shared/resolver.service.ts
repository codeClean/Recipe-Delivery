import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipe/recipe.model';
import { Injectable } from '@angular/core';
import * as fromAppRoot from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as recipeAction from '../recipe/store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResolverService implements Resolve<Recipe[]> {

    constructor(private store: Store<fromAppRoot.AppState>,
                private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this resolver always waits  observable
       // console.log(' inside resolver ');

        return  this.store.select('recipeState').pipe(take(1), map(recipeState => {
            return recipeState.recipes;
        }), switchMap(recipes => {
            if (recipes.length === 0) {
                // there is no  recipe in storage so get from server
                this.store.dispatch(new recipeAction.FeatchRecipe());
                return this.actions$.pipe(ofType(recipeAction.SET_RECIPE), take(1));
            } else {
                return of(recipes);
            }
        }));
    }
}


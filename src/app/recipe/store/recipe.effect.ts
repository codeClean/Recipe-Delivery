import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as recipeAction from './recipe.action';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromAppRoot from '../../store/app.reducer';

import * as env from '../../../environments/environment';

@Injectable()
export class RecipeEffect {

    constructor( private action$: Actions, private http: HttpClient, private store: Store<fromAppRoot.AppState>) {}

    @Effect()
    actionFeatch = this.action$.pipe(ofType( recipeAction.FEATCH_RECIPE),
    switchMap(() => {
        return this.http.get<Recipe[]>('https://recipe-milano.firebaseio.com/recipes.json')
    }),
    map(recipes => {
        if (!recipes) {
            return;
        }
        return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
    }), map(recipes => {
        // this will automatically dispatch

        return new recipeAction.SetRecipe(recipes);
    })
    );
/////////
/* const recipeData: Recipe[] = this.recipeServ.getRecipe();

        console.log('recipe' + recipeData);
        this.http.put('https://recipe-milano.firebaseio.com/recipes.json', recipeData).subscribe((response) => {
            console.log('got response ' + response);
        }); */
        //////////////
    @Effect({dispatch: false})
    actionStoreRecipe = this.action$.pipe(ofType(recipeAction.STORE_RECIPE),
    withLatestFrom(this.store.select('recipeState')),
    switchMap(([actionData, recipeState]) => {
        
        return this.http.put('https://recipe-milano.firebaseio.com/recipes.json', recipeState.recipes);
    })
    );
}

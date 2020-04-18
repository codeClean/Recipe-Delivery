import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Data } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppRoot from '../store/app.reducer';
import * as recipeActions from '../recipe/store/recipe.action';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
                private store: Store<fromAppRoot.AppState>) {
    }

    saveRecipe() {
        /* const recipeData: Recipe[] = this.recipeServ.getRecipe();

        console.log('recipe' + recipeData);
        this.http.put('https://recipe-milano.firebaseio.com/recipes.json', recipeData).subscribe((response) => {
            console.log('got response ' + response);
        }); */
    }
    fetchRecipe() {
        /*  let token;
         this.userData.user.subscribe(user => {
               token  = user.token;
         }); */
        return this.http.get<Recipe[]>('https://recipe-milano.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                if (!recipes) {
                    return;
                }
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }), tap(recipes => {
                if (!recipes) {
                    return;
                }
                console.log('tap is working');
                this.store.dispatch(new recipeActions.SetRecipe(recipes));

                // this.recipeServ.setRecipe(recipes);
            }));
    }
    fetchMyRecipe() {
        /*  let token;
         this.userData.user.subscribe(user => {
               token  = user.token;
         }); */
        return this.http.get<Recipe[]>('https://recipe-milano.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                if (!recipes) {
                    return;
                }
                return recipes.map(recipe => {
                    if (!recipe) {
                        return;
                    }
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }), tap(recipes => {
                if (!recipes) {
                    return;
                }
                const username = JSON.parse(localStorage.getItem('userData')).email;
                const myrecipes = recipes.filter(myrecipe => {
                    return myrecipe.username === username;
                });
                console.log('tap is working');
                // this.recipeServ.setRecipe(myrecipes);

                this.store.dispatch(new recipeActions.SetRecipe(myrecipes));

            }));
    }

}

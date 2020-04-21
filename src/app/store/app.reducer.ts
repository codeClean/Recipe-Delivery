import * as fromShoppingList from '../shopping/store/shopping-list.reducer';
import * as fromAuth from '../login/store/auth.reducer';
import * as fromRecipe from '../recipe/store/recipe.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    authState: fromAuth.State;
    recipeState: fromRecipe.State;

}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    authState: fromAuth.authReducer,
    recipeState: fromRecipe.RecipeReducer

};
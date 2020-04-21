import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = '[Recipe] add recipe';
export const UPDATE_RECIPE = '[Recipe] update recipe';
export const DELETE_RECIPE = '[Recipe] delete recipe';

export const SET_RECIPE = '[Recipe] set recipe';
export const FEATCH_RECIPE = '[Recipe] featch recipe';
export const STORE_RECIPE = '[Recipe] store recipe';

export const FILTER_MYRECIPE = '[Recipe] filter recipe ';

export class FilterMyRecipe implements Action {
    readonly type = FILTER_MYRECIPE;
    constructor(public payload: string) { } // i am expecting a username 
}
export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: { index: number, newRecipe: Recipe }) { }
}
export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) { }
}
export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) { }
}

export class FeatchRecipe implements Action {
    readonly type = FEATCH_RECIPE;
}

export class StoreRecipe implements Action {
    readonly type = STORE_RECIPE;
}

export type recipeTypes = SetRecipe
                        | AddRecipe
                        | FeatchRecipe
                        | UpdateRecipe
                        | DeleteRecipe
                        | FilterMyRecipe;

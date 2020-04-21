import { Ingredient } from 'src/app/shared/shared.model';
import * as recipeActions from './recipe.action';
import { state } from '@angular/animations';
import { Recipe } from '../recipe.model';
import { SET_RECIPE } from './recipe.action';


export interface State {
    recipes: Recipe[];
    myRecipes: Recipe[];
    allRecipes: boolean;
}

const initialstate: State = {
    recipes: [],
    myRecipes: [],
    allRecipes: true,
};
// tslint:disable-next-line: no-shadowed-variable
export function RecipeReducer(state = initialstate, action: recipeActions.recipeTypes) {
    switch (action.type) {

        case recipeActions.FILTER_MYRECIPE:
            return {...state, allRecipes: false, myRecipes: state.recipes.filter((recipe, index) => {
                return recipe.username === action.payload;
            })
         };
        case recipeActions.ADD_RECIPE:
            return { ...state, recipes: [...state.recipes, action.payload] };

        case recipeActions.UPDATE_RECIPE:
            const updatedRecipe = {...state.recipes[action.payload.index], ...action.payload.newRecipe};
            const updatedRecipes = [...state.recipes ];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return {...state, recipes: updatedRecipes};

        case recipeActions.DELETE_RECIPE:
           return {...state, recipes: state.recipes.filter((recipe, index) => {
               return index !== action.payload;
           })
        };

        case recipeActions.SET_RECIPE:
            return { ...state, allRecipes: true, recipes: [...action.payload] };


        default:
            return state;
    }

}

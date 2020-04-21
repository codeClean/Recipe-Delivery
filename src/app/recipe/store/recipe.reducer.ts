import { Ingredient } from 'src/app/shared/shared.model';
import * as recipeActions from './recipe.action';
import { state } from '@angular/animations';
import { Recipe } from '../recipe.model';
import { SET_RECIPE } from './recipe.action';


export interface State {
    recipes: Recipe[];
<<<<<<< HEAD
    myRecipes: Recipe[];
    allRecipes: boolean;
}

const initialstate: State = {
    recipes: [],
    myRecipes: [],
    allRecipes: true,
=======
}

const initialstate: State = {
    recipes: []
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
};
// tslint:disable-next-line: no-shadowed-variable
export function RecipeReducer(state = initialstate, action: recipeActions.recipeTypes) {
    switch (action.type) {
<<<<<<< HEAD

        case recipeActions.FILTER_MYRECIPE:
            return {...state, allRecipes: false, myRecipes: state.recipes.filter((recipe, index) => {
                return recipe.username === action.payload;
            })
         };
=======
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
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
<<<<<<< HEAD
            return { ...state, allRecipes: true, recipes: [...action.payload] };
=======
            return { ...state, recipes: [...action.payload] };
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f


        default:
            return state;
    }

}

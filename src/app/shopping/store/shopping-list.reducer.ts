import { Ingredient } from 'src/app/shared/shared.model';
import { ADD_INGREDIENT } from './shopping-list.action';
import * as shoppingListAction from './shopping-list.action';

/* export interface AppState {
    shoppingReducer: State;
} */
export interface State {
    ingredients: Ingredient[];
    ingredient: Ingredient;
    index: number;
}

const initialState = {
    ingredients: [
        new Ingredient('fish', 2),
        new Ingredient('pasta', 5)
    ],
    ingredient: null,
    index: -1
};
export function shoppingListReducer(state: State = initialState, action: shoppingListAction._shoppingActions) {
    switch (action.type) {
        case shoppingListAction.START_EDIT:
            return {
                ...state, ingredient: {...state.ingredients[action.payload]}, index: action.payload
            };
      case shoppingListAction.STOP_EDIT:
            return {
                ...state, ingredient: null, index: -1
            };
        case shoppingListAction.ADD_INGREDIENT:
            return {
                ...state, ingredients: [...state.ingredients, action.payload]
            };
            break;
        case shoppingListAction.ADD_INGREDIENTS:
            return {
                ...state, ingredients: [...state.ingredients, ...action.payload]
            };
            break;
        case shoppingListAction.UPDATE_INGREDIENT:
            const newIngredient = {
                ...state.ingredients[state.index],
                ...action.payload
            };
            const toBeUpdatedIngredients = [...state.ingredients];
            toBeUpdatedIngredients[state.index] = newIngredient;
            return { ...state, ingredients: toBeUpdatedIngredients , ingredient: null, index : -1};
            break;
        case shoppingListAction.DELETE_INGREDIENT:

            return {
                ...state, ingredients: state.ingredients.filter((ing, ingIndex) => {
                    return ingIndex !== state.index;
                }), ingredient: null, index : -1
            };
            break;

        default: return state;
                 break;
    }
}



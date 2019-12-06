import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListACtions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Oranges', 1),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};
export function shoppingListReducer(state: State = initialState, action: ShoppingListACtions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListACtions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
            break;
        case ShoppingListACtions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
            break;
        case ShoppingListACtions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];

            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient:null,
                editedIngredientIndex:-1
            };
            break;
        case ShoppingListACtions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredient:null,
                editedIngredientIndex:-1
            };
            break;
        case ShoppingListACtions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex:action.payload,
                editedIngredient:{...state.ingredients[action.payload]}                
            };
            break;
        case ShoppingListACtions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex:-1,
                editedIngredient:null
            };
            break;
        default:
            return state;
    }
}
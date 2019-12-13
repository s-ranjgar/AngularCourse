// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Store } from '@ngrx/store';

// import { Recipe } from './recipe.model';
// import { Ingredient } from '../shared/ingredient.model';
// import * as shoppingListActions from '../shopping-list/store/shopping-list.actions';
// import * as fromApp from '../store/app.reducer';


// @Injectable()
// export class RecipeService {
//     recipeChanged = new Subject<Recipe[]>();
//     private recipes: Recipe[] = [];
//     // private recipes: Recipe[] = [
//     //     new Recipe('Meatball',
//     //         'Meatball with tomato souce',
//     //         'https://cdn.popmenu.com/image/upload/c_limit,f_auto,h_1920,q_auto,w_1920/v1561578982/t9qjfwnqxm3y1tforr5r.jpg',
//     //         [new Ingredient('Meat', 1),
//     //         new Ingredient('Rice', 1),
//     //         new Ingredient('Tomato', 10)]
//     //     )
//     //     , new Recipe('Stake', 'Steake with french fries',
//     //         'https://cdn.popmenu.com/image/upload/c_limit,f_auto,h_1440,q_auto,w_1440/j7gunhkdbqkgwhpfl808.jpg',
//     //         [new Ingredient('Meat', 1),
//     //         new Ingredient('Tomato', 10),
//     //         new Ingredient('Potato', 3)]
//     //     )
//     // ];

//     constructor(private store: Store<fromApp.AppState>) { }

//     setRecipes(recipes: Recipe[]) {
//         this.recipes = recipes;
//         this.recipeChanged.next(this.recipes.slice());
//     }
//     getRecipes() {
//         return this.recipes.slice();
//     }

//     addIngredientsToShoppingList(ingredients: Ingredient[]) {
//         // this.slService.addIngredients(ingredients);
//         this.store.dispatch(new shoppingListActions.AddIngredients(ingredients))
//     }

//     getRecipe(index: number) {
//         return this.recipes[index];
//     }

//     addRecipe(recipe: Recipe) {
//         this.recipes.push(recipe);
//         this.recipeChanged.next(this.recipes.slice());
//     }

//     updateRecipe(index: number, newRecipe: Recipe) {
//         this.recipes[index] = newRecipe;
//         this.recipeChanged.next(this.recipes.slice());

//     }

//     deleteRecipe(index: number) {
//         this.recipes.splice(index, 1);
//         this.recipeChanged.next(this.recipes.slice());

//     }


// }
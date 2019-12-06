import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
   this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        // this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({ name: this.editedItem.name, amount: this.editedItem.amount });
      } else {
        this.editMode = false;
      }
    })
    // this.subscription = this.slService.startedEditing.subscribe((index: number) => {
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.editedItem = this.slService.getIngredient(index);
    //   this.slForm.setValue({ name: this.editedItem.name, amount: this.editedItem.amount });
    // });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new shoppingListActions.UpdateIngredient( newIngredient ));
    } else {
      // this.slService.addIngredient(newIngredient);

      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }

    this.onClearItem();
  }

  onDeleteItem() {

    if (this.editMode) {
      // this.slService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new shoppingListActions.DeleteIngredient());

    }
    this.onClearItem();
  }

  onClearItem() {
    this.editMode = false;    
    this.editedItem = null;
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}

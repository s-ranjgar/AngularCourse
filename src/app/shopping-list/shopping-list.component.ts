import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import * as fromApp from '../store/app.reducer';
import * as fromShoppingActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>,
    private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppinglistService.getIngredients();
    // this.subscription = this.shoppinglistService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');

  }

  onEditItem(index: number) {
    // this.shoppinglistService.startedEditing.next(index);
    this.store.dispatch(new fromShoppingActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}

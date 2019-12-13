import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;

    /**
     *
     */
    constructor(
        private authService: AuthService,
        private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.userSub = this.store.select('auth')
            .pipe(map(authState => { return authState.user; }))
            .subscribe(user => {
                this.isAuthenticated = !user ? false : true;
                // this.isAuthenticated = !!user;
            });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData() {
        // this.dataStorageService.fetchRecipes()
        //     .subscribe((recipes) => {
        //         this.recipeService.setRecipes(recipes)
        //     });
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import *as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

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
    constructor(private dataStorageService: DataStorageService,
        private recipeService: RecipeService,
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
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes()
            .subscribe((recipes) => {
                this.recipeService.setRecipes(recipes)
            });
    }

    onLogout() {
        this.authService.logout();
    }
}
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        let authObeservable: Observable<AuthResponseData>;
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            authObeservable = this.authService.login(email, password);
        } else {
            authObeservable = this.authService.signup(email, password);
        }

        authObeservable.subscribe((response) => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }
            , errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}
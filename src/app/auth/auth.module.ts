import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        RouterModule.forChild([{ path: '', component: AuthComponent }]),
        SharedModule,
        FormsModule
    ]
})
export class AuthModule{

}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "", redirectTo: "login",
      },
      {
        path: "login", component: LoginComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }

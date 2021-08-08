import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map } from "rxjs/operators"
import { AuthService } from "src/app/services/auth.service";
import { AuthResponseData } from "src/app/models/auth-response-data.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.action";
import { of } from "rxjs";


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>
    ) {

    }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(map((data: AuthResponseData) => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    this.store.dispatch(setErrorMessage({ message: "" }));
                    const user = this.authService.formatUser(data);
                    return loginSuccess({ user });
                }), catchError(err => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    const errorMessage = this.authService.getErrorMessage(err.error.error.message);
                    return of(setErrorMessage({ message: errorMessage }));
                }))
            }))
    })
}
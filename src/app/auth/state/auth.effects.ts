import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators"
import { AuthService } from "src/app/services/auth.service";
import { AuthResponseData } from "src/app/models/auth-response-data.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.action";
import { of } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
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

                    this.authService.setUserInLocalStorage(user);

                    return loginSuccess({ user, redirect: true });
                }), catchError(err => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    const errorMessage = this.authService.getErrorMessage(err.error.error.message);
                    return of(setErrorMessage({ message: errorMessage }));
                }))
            }))
    })

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[loginSuccess, signupSuccess]),
            tap((action) => {
                this.store.dispatch(setErrorMessage({ message: "" }));
                if (action.redirect) {
                    this.router.navigate(['/'])
                }
            }))
    }, { dispatch: false });


    signUp$ = createEffect(() => {
        return this.actions$.pipe(ofType(signupStart), exhaustMap((action) => {
            return this.authService.signUp(action.email, action.password).pipe(
                map((data) => {
                    this.store.dispatch(setLoadingSpinner({ status: false }))
                    const user = this.authService.formatUser(data);

                    this.authService.setUserInLocalStorage(user);

                    return signupSuccess({ user, redirect: true })
                }), catchError(err => {
                    this.store.dispatch(setLoadingSpinner({ status: false }));
                    const errorMessage = this.authService.getErrorMessage(err.error.error.message);
                    return of(setErrorMessage({ message: errorMessage }));
                })
            )
        }))
    })

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(ofType(autoLogin), mergeMap((action) => {
            const user = this.authService.getUserFromLocalStorage();
            console.log(user);
            return of(loginSuccess({ user, redirect: false }))
        }))
    })


    logout$ = createEffect(() => {
        return this.actions$.pipe(ofType(autoLogout), map(action => {
            this.authService.logout();
            this.router.navigate(['auth'])
        }))
    }, { dispatch: false })
}
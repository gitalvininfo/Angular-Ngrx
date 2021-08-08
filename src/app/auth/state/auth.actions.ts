import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";


export const LOGIN_START = "login start";
export const LOGIN_SUCCESS = "login success";
export const LOGIN_FAILED = "login failed";
export const SIGNUP_START = "signup start";
export const SIGNUP_SUCCESS = "signup success";
export const AUTO_LOGIN = "auth login";


export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string }>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());

export const signupStart = createAction(SIGNUP_START, props<{ email: string, password: string }>());

export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User }>())

export const autoLogin = createAction(AUTO_LOGIN, props<{ user: User }>())
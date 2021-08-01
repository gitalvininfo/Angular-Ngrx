import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";


export const LOGIN_START = "login start";
export const LOGIN_SUCCESS = "login success";
export const LOGIN_FAILED = "login failed";


export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string }>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
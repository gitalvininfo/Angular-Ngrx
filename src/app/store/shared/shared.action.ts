import { createAction, props } from "@ngrx/store";

export const SET_LOADING_ACTION = "set loading spinner";

export const setLoadingSpinner = createAction(SET_LOADING_ACTION, props<{ status: boolean }>());


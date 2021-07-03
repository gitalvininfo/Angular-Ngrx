import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";


// the 'counter' here look in app.module you idiot
const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, state => {
    return state.counter;
})

export const getChannelName = createSelector(getCounterState, state => {
    return state.channelName;
})


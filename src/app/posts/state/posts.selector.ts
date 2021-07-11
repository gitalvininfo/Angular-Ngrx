import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";

// the 'posts' here look in app.state appReducer you idiot
const getPostState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostState, state => {
    return state.posts;
})


export const getPostById = createSelector(getPostState, (state, props) => {
    // return state.posts[props.id] ? state.posts[props.id] : null;
    return state.posts.find((post) => post.id === props.id);
})
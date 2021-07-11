import { createReducer, on } from "@ngrx/store";
import { addPost, editPost } from "./posts.action";
import { initialState } from "./posts.state";


const _postsReducer = createReducer(initialState,
    on(addPost, (state, action) => {
        console.warn(action)
        let post = { ...action.post };

        post.id = (state.posts.length + 1).toString();

        return {
            ...state,
            // posts here is in app state appReducer you idiot
            posts: [...state.posts, post]
        }
    }), on(editPost, (state, action) => {
        const updatedPosts = state.posts.map(post => {
            return action.post.id === post.id ? action.post : post;
        })
        return {
            ...state,
            posts: updatedPosts
        }
    }))

export function postsReducer(state, action) {
    return _postsReducer(state, action);
}
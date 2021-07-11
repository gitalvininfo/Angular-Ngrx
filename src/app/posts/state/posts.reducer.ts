import { createReducer, on } from "@ngrx/store";
import { addPost } from "./posts.action";
import { initialState } from "./posts.state";


const _postsReducer = createReducer(initialState,
    on(addPost, (state, action) => {
        let post = { ...action.post };

        post.id = (state.posts.length + 1).toString();

        console.warn('reducer', post)
        return {
            ...state,
            // posts here is in app state appReducer you idiot
            posts: [...state.posts, post]
        }
    }))

export function postsReducer(state, action) {
    return _postsReducer(state, action);
}
import { createReducer, on } from "@ngrx/store";
import { addPost, addPostSuccess, deletePost, editPost, loadPostSuccess } from "./posts.action";
import { initialState } from "./posts.state";


const _postsReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };
        // post.id = (state.posts.length + 1).toString();
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
    }), on(deletePost, (state, { id }) => {
        const updatedPosts = state.posts.filter((post) => {
            return post.id !== id;
        })
        return {
            ...state,
            posts: updatedPosts
        }
    }), on(loadPostSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    }))

export function postsReducer(state, action) {
    return _postsReducer(state, action);
}
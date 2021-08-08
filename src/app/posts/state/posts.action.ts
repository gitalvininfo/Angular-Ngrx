import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";


export const ADD_POST_ACTION = '[posts page] add post';
export const EDIT_POST_ACTION = '[posts page] edit post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POSTS = "load posts";
export const LOAD_POSTS_SUCCESS = "load posts success";


export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const editPost = createAction(EDIT_POST_ACTION, props<{ post: Post }>());

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());

export const loadPost = createAction(LOAD_POSTS);
export const loadPostSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>());


import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, editPost, editPostSuccess, loadPost, loadPostSuccess } from "./posts.action";

@Injectable()
export class PostsEffect {

    constructor(private actions$: Actions, private postService: PostsService) {

    }

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadPost),
            mergeMap((action) => {
                return this.postService.getPosts().pipe(
                    map((posts) => {
                        return loadPostSuccess({ posts })
                    })
                )
            }))
    })


    addPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(addPost),
            mergeMap(action => {
                return this.postService.addPost(action.post).pipe(
                    map(data => {
                        const post = { ...action.post, id: data.name }
                        console.log(post)
                        return addPostSuccess({ post });
                    })
                )
            }))
    })

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(editPost),
            switchMap((action) => {
                return this.postService.updatePost(action.post).pipe(
                    map((data) => {
                        console.warn('***', data)
                        console.warn('***', action)
                        return editPostSuccess({ post: action.post });
                    })
                )
            }))
    })


    deletePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(deletePost),
            switchMap((action) => {
                return this.postService.deletePost(action.id).pipe(
                    map((data) => {
                        return deletePostSuccess({ id: action.id })
                    })
                )
            }))
    })

}
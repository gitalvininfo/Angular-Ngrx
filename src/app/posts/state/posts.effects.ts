import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { PostsService } from "src/app/services/posts.service";
import { loadPost, loadPostSuccess } from "./posts.action";

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

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post
  form1: FormGroup;
  submitForm = false;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.store.select(getPostById, { id }).subscribe(data => {
        this.post = data;
        this.initForm();
      })
    })
  }

  initForm() {
    this.form1 = this.formBuilder.group({
      title: [this.post.title, [Validators.required]],
      description: [this.post.description, [Validators.required]],
    })
  }

  submit() {
    this.submitForm = true;
    if (this.form1.invalid) {
      return;
    }

    const post: Post = {
      title: this.form1.value.title,
      description: this.form1.value.description,
    }

    // this.store.dispatch(addPost({ post }))
  }


  get f() {
    return this.form1.controls;
  }
}

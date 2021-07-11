import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  form1: FormGroup;
  submitForm = false;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form1 = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
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

    this.store.dispatch(addPost({ post }))
  }


  get f() {
    return this.form1.controls;
  }

}

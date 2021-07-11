import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  form1: FormGroup;
  submitForm = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form1 = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  submit() {
    this.submitForm = true;
    if(this.form1.invalid) {
      return;
    }
  }


  get f() {
    return this.form1.controls;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: "Jack",
      username: "Jack2222",
      password: "1234",
      passwordRepeat: "1234",
    })
    // new FormGroup({
    //   name: new FormControl("Jack"),
    //   username: new FormControl("Jack2222"),
    //   password: new FormControl("1234"),
    //   passwordRepeat: new FormControl("1234"),
    // })
  }

  onSubmit(form: FormGroup) {
    console.log("submitted");
    console.log(form.value.name);
    console.log(form.value);


  }
}

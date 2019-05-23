import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    email: ['', Validators.email],
    avatar: [''],
    address: this.fb.group({
      state: [''],
      zipcode: [''],
      buildingNumber: [''],
      street: ['']
    })
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe(data => console.log(data));
  }

}

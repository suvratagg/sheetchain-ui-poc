import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Router } from '@angular/router';

import { UserServiceService } from '../../user-service.service'

//import Must Match validator for passwords
import { MustMatch } from './helper/must-match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // global variables required in the file
  showLogin: boolean = false;
  showRegister: boolean = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  adminData: any;

  //constructor declaring our service, forbuilder and router
  constructor(private userService: UserServiceService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button";
    window.onhashchange = function () { window.location.hash = "no-back-button" };

    this.registerForm = this.formBuilder.group({
      //username: new FormControl(),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userType: new FormControl('User'),
      email: new FormControl('', [Validators.required, Validators.email]),
      
      confirmPassword: new FormControl('', Validators.required),
      
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });


    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('')
    });

    this.showLogin = true;
  }

  // login button 
  login() {
    const request = this.loginForm.get('username').value;
    const req = this.loginForm.get('password').value;
    if ((request === null) || (request === '') || (req === null) || (req === '')) {
      Swal.fire({
        icon: 'error',
        title: 'Enter All Details!'
        //text: 'Something went wrong!'
      })
    } else {
      this.userService.getUserName(request).subscribe(data => {
        if (data) {
          
          this.userService.getPassword(req).subscribe(data => {
            if (data) {
              // if (data.userType === "Admin") {
              //   delete data.password;
              //   delete data.firstName;
              //   delete data.lastName;
              //   delete data.userType;
              //   delete data.email;
              //   this.router.navigate(['/admin', data]);
              //   localStorage.setItem('logIn', data.username);
              // } else {
                delete data.password;
                delete data.firstName;
                delete data.lastName;
                delete data.userType;
                delete data.email;
                this.router.navigate(['/landing', data]);              //navigate to landing
                localStorage.setItem('logIn', data.username);
              // }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Incorrect Password'
              })
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'User Does Not Exist'
          })
        }
      })
    }
    this.loginForm.reset();
  }

  // open register new user form
  createUser() {
    this.showLogin = false;
    this.showRegister = true;
  }

  // browse back to login form
  backToLogin() {
    this.showRegister = false;
    this.showLogin = true;
  }

  // save new user account details
  saveUser() {
    //delete this.registerForm.value.confirmPassword;
    let request = this.registerForm.getRawValue();
    delete request.confirmPassword;
    console.log(request);
    if ((request.firstName === null) || (request.firstName === '') || (request.lastName === null) ||
      (request.lastName === '') || (request.username === null) || (request.username === '') || (request.password === null)
      || (request.password === '') || (request.userType === null)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter All The Details'
      })
    } else {
      const uname = request.username;
      this.userService.getUserName(uname).subscribe(data => {
        if (data) {
          Swal.fire({
            icon: 'error',
            title: 'Username Already Exists'
          })
        } else {
          this.userService.registerUser(request).subscribe(data => {
          });
          this.userService.addUser(request).subscribe(data=>{
              delete request.password;
              delete request.firstName;
              delete request.lastName;
              delete request.userType;
              delete request.email;
              Swal.fire({
                icon: 'success',
                title: 'Registered Successfully!!',
                text: 'Please Login with your credentials.'
              })

              this.backToLogin();     
          })
        }
      });
    }

    this.registerForm.reset();
  }

  
}

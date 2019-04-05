import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData:any = {
    email:'',
    password:''
  }

  constructor(private _auth:AuthService , private _router:Router) { }

  registerUser(){
    return this._auth.register(this.registerUserData).subscribe((res)=>{
      console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/login'])
    },
    (err) => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

}

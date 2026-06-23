import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {VerfivationToken } from '../../services/verfivationToken/verfivation-token'


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login 
{
  public username: string = '';
  public password: string = '';

  
  constructor(private http: HttpClient, private router: Router ,private Verfivation : VerfivationToken) {}
  
  
  
  
  ngOnInit():void{

     if(this.Verfivation.islogin() == true){
        this.router.navigate(['/Mainpage']);
      }
    
    }


  onLogin() {
    
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    
    var url = "http://194.146.24.155/clinical/api/Account/Login";
    //var url = "http://localhost:5076/api/Account/Login";
    this.http.post(url, { email: this.username, password: this.password })
      .subscribe(response => {
        
        console.log('Login successful:', response);
        
        localStorage.setItem('token', JSON.stringify(response));
        
        if(this.Verfivation.GetLoginState() == 1)
        {
          this.router.navigate(['/Mainpage']);
        }
        
      }, error => {
         
         console.error('Login failed:', error);
         
         localStorage.removeItem('token');
         
         localStorage.setItem('token', JSON.stringify(error));
      
        });
  }
}


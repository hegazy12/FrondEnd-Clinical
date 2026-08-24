import { Component, Injectable,afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerfivationToken } from '../../services/verfivationToken/verfivation-token';
import { LoginResponse } from '../../interfaces/login-response';
import { SwalAlert } from '../../services/swalAlert/swal-alert';
import { ChatService } from '../../services/ChatService/chat-service';
import { LinkService } from '../../services/linkService/link-service';
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

  
  constructor(private http: HttpClient,
              private router: Router ,
              private chatService: ChatService ,
              private Verfivation : VerfivationToken,
              private swal: SwalAlert,private LinkService : LinkService)
    {
    }
  
  ngOnInit():void{

     if(this.Verfivation.islogin() == true){
        this.router.navigate(['/mainpage']);
      }
    
    }


  onLogin() {
    
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    
    // var url = "http://194.146.24.155/clinical/api/Account/Login";
    // var url = " https://localhost:7262/Account/Login";
    // var url = "http://192.168.0.148:5000/Account/Login";
    // var url = "https://barge-manhole-crib.ngrok-free.dev/api/Account/Login";
    
    var url = this.LinkService.gitLinK()+"Account/Login";
    
    this.http.post<LoginResponse>(url, { userName: this.username, password: this.password })
      .subscribe(response => {   
        localStorage.setItem('Login', JSON.stringify(response.success));
        if(response.success === true)
        {
          localStorage.setItem('token'      , JSON.stringify(response.data.token));
          localStorage.setItem('roles'      , JSON.stringify(response.data.roles));
          localStorage.setItem('id'         , JSON.stringify(response.data.id));
          localStorage.setItem('userName'   , JSON.stringify(response.data.userName));
          console.log('Token stored in localStorage:', response.data.token);
          this.router.navigate(['/mainpage']);
          ///////////////////////////////////////////////////////
          //sthis.chatService.connect(response.data.id);/////
          ///////////////////////////////////////////////////////
          console.log('Login successful:', response);
        }
        else
        {
          console.error('Login failed:', response.message);
           afterNextRender(() => { 
              localStorage.removeItem('token');});
          this.swal.showLoginFailed(response.message);
        }
        
      }, error => 
        {
         console.error('Login failed:', error);
         localStorage.removeItem('token');
         localStorage.setItem('token', JSON.stringify(error));
        });
  }
}


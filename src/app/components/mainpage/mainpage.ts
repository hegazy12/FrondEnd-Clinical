import { Component, signal } from '@angular/core';
import {Callapi} from '../../services/callapi/callapi';
import { Router } from '@angular/router';
import {VerfivationToken } from '../../services/verfivationToken/verfivation-token'
import {Navbar} from '../navbar/navbar'
import {Chattext} from '../chattext/chattext';
import { QRCodeComponent } from 'angularx-qrcode';
import {Camera} from '../camera/camera'
@Component({
  selector: 'app-mainpage',
  imports: [Navbar,Chattext  ,QRCodeComponent,Camera],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})

export class Mainpage 
{
  public doctorId = signal<string|null>('');
  
  constructor(private callapi : Callapi,private router:Router,private Vervication:VerfivationToken)
  {
     this.doctorId.set(this.Vervication.GetLoginID());
  }
  
  ngOnInit():void
  {
    if(this.Vervication.islogin() == false)
    {
      console.log("manePage is " + this.Vervication.islogin());
      this.router.navigate(['/login']);
    }
    else
    {
        
      console.log("ManePage is " + this.Vervication.islogin());
        
     

      console.log('http://localhost:4200/phonetraker/'+ this.doctorId());
    }
  }
  
}

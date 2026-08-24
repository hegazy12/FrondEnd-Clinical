import { Component, signal } from '@angular/core';
import {Callapi} from '../../services/callapi/callapi';
import { Router } from '@angular/router';
import {VerfivationToken } from '../../services/verfivationToken/verfivation-token'
import {Navbar} from '../navbar/navbar'
import {Chattext} from '../chattext/chattext';
import { QRCodeComponent } from 'angularx-qrcode';
import {Camera} from '../camera/camera'
import {LinkService} from '../../services/linkService/link-service'

@Component({
  selector: 'app-mainpage',
  imports: [Navbar,Chattext  ,QRCodeComponent,Camera],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})

export class Mainpage 
{
  public doctorId = signal<string|null>('');
  public frontLink = signal<string>('');
  constructor(private callapi : Callapi,private router:Router,private Vervication:VerfivationToken,private LinkService : LinkService)
  {
     this.doctorId.set(this.Vervication.GetLoginID());
     this.frontLink.set(this.LinkService.gitFrontOrigin());
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
      console.log(this.frontLink() +'/phonetraker/'+ this.doctorId());
      this.frontLink.set(this.frontLink() +'/phonetraker/'+ this.doctorId());
    }
  }
  
}

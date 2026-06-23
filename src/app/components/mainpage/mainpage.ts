import { Component } from '@angular/core';
import {Callapi} from '../../services/callapi/callapi';
import { Router } from '@angular/router';
import {VerfivationToken } from '../../services/verfivationToken/verfivation-token'
import {Navbar} from '../navbar/navbar'

@Component({
  selector: 'app-mainpage',
  imports: [Navbar],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage 
{
  constructor(private callapi : Callapi,private router:Router,private Vervication:VerfivationToken)
  {
   
  }
  
  ngOnInit():void
  {
    if(this.Vervication.islogin() == false)
    {
         console.log("ManePage is " + this.Vervication.islogin());
         this.router.navigate(['/Login']);
    }
    else
    {
      console.log("ManePage is " + this.Vervication.islogin());
    }
  }

  

}

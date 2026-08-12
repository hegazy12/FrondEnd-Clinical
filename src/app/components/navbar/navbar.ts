import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar 
{
  public roles :string[] = JSON.parse(localStorage.getItem("roles") || "[]");
 
   constructor(private router: Router ){}

   ngOnInit():void
   {
    console.log("roles : " + this.roles);
   }

  public logOut (): void 
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

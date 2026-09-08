import { isPlatformBrowser } from '@angular/common';
import { Component ,PLATFORM_ID,Inject } from '@angular/core';
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
   public roles: string[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) 
  {

  }
  
  ngOnInit():void
  {
    if (isPlatformBrowser(this.platformId)) {
      this.roles = JSON.parse(localStorage.getItem("roles") || "[]");
    }
  }

  public logOut (): void 
  {
   
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}

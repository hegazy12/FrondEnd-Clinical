import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({providedIn: 'root'})
export class VerfivationToken
{
  private isBrowser: boolean;

  private token: string | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public getToken(): string | null {
    if (this.isBrowser)
    {this.token = localStorage.getItem("token") || "null";
    return this.token.replace(/"/g, ''); // Remove double quotes if present
  }else {
    return null;
  }
  }
  
  public GetLoginState() : boolean | null {
  if (this.isBrowser)
  {
    return Boolean(localStorage.getItem("Login")) ||false;
  }
  else
  {
    return null;
  }
  }
  
  public islogin() :boolean
  {
   
    if (!this.isBrowser) return false;
    try {
        if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined || localStorage.getItem('token') === "null" || localStorage.getItem('token') === "undefined"){
            return false;
        }
        else if (this.GetLoginState() === false || this.GetLoginState() === null ){
          return false;
        }
        else if(this.GetLoginState() == true){
          return true;
        } else {
          return false;
        }
      }catch
       {
          return false;
      } 
  }

  public GetLoginID() : string |null
  {
    if (this.isBrowser)
    { this.token = localStorage.getItem("id") || "null";
      return this.token.replace(/"/g, ''); 
    }else {
      return null;
    }
  }
}

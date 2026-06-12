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
    {this.token = JSON.parse(localStorage.getItem("token") || "null").token;
    return this.token;
  }else {
    return null;
  }
  }
  
  public GetLoginState() : number | null {
  if (this.isBrowser)
  {
    return parseInt(JSON.parse(localStorage.getItem("token") || "null").login);
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
        if(localStorage.getItem('token') === null){
            return false;
        }
        else if (this.GetLoginState() == 0 || this.GetLoginState() === null ){
          return false;
        }
        else if(this.GetLoginState() == 1){
          return true;
        } else {
          return false;
        }
      }catch
       {
          return false;
      } 
  }
}

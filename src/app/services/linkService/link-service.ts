import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LinkService
{
  
  
      //private url: string = "http://194.146.24.155/clinical/api/";
      //private url: string = "https://localhost:7262/"
      //private url: string = "https://barge-manhole-crib.ngrok-free.dev/api/"
      //private url: string = "http://192.168.0.148:5000/"
      private url = "http://localhost:5244/"
      //private url = "http://localhost:5000/"
      
      public gitLinK():string 
      {
        return this.url;
      }

      public gitFrontOrigin():string{
        return window.location.origin;
      }
      
}

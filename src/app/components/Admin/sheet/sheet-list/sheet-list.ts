import { Component, signal } from '@angular/core';
import { ListSheetResponse,  SheetDto1 } from '../../../../interfaces/sheet-dto';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import {Callapi} from '../../../../services/callapi/callapi'
@Component({
  selector: 'app-sheet-list',
  imports: [],
  templateUrl: './sheet-list.html',
  styleUrl: './sheet-list.css',
})
export class SheetList {
    

      constructor(
          private Callapi : Callapi,
          private Verfication :VerfivationToken,
          private swal: SwalAlert 
        )
        {
  
        }

    public data =signal<SheetDto1[]>([]); 
    
    ngOnInit():void
    {
      if(this.Verfication.islogin() == false){
          
        }
      else
        {  
         this.SheetList();
        }
    }
    

    public SheetList() : boolean {
            
      let Sup = this.Callapi.SheetList().subscribe({
        next: (P : ListSheetResponse) =>
              {
                this.data.set(P.data);
                console.log(P.data);
                Sup.unsubscribe();
              },
        error: (err) => 
            {
              Sup.unsubscribe();
            }
            });

            return true;
      }
}

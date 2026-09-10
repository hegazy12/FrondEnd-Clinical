import { Component, Input, signal } from '@angular/core';
import { ListSheetResponse, SheetDto1 } from '../../../interfaces/sheet-dto';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';

@Component({
  selector: 'app-add-history',
  imports: [],
  templateUrl: './add-history.html',
  styleUrl: './add-history.css',
})
export class AddHistory
{
    @Input({ required: true }) AppointmentID!: string;

    public Sheetdata =signal<SheetDto1[]>([]); 
    
     constructor(private callapi : Callapi,private Vervication:VerfivationToken)
              { 
              
              }
           
  ngOnInit():void 
  {
    if(this.Vervication.islogin() == false)
    { 
     
    }
    else
    {
      this.SheetList();
    }
  }   

    public SheetList() : boolean 
    {            
      let Sup = this.callapi.SheetList().subscribe({
        next: (P : ListSheetResponse) =>
              {
                this.Sheetdata.set(P.data);
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

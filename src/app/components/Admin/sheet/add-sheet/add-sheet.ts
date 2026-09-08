import { Component, ViewChild } from '@angular/core';
import { SheetDto } from '../../../../interfaces/sheet-dto';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import {Callapi} from '../../../../services/callapi/callapi'
import { SheetList } from '../sheet-list/sheet-list';

@Component({
  selector: 'app-add-sheet',
  imports: [SheetList],
  templateUrl: './add-sheet.html',
  styleUrl: './add-sheet.css',
})
export class AddSheet 
{


  @ViewChild(SheetList) SheetListRef!: SheetList;

      constructor(private Callapi : Callapi,
                  private Verfication :VerfivationToken,
                  private swal: SwalAlert)
                  {
                  }
  
  public AddSheetItem(sheetItem: string): void 
  {
            let sheet :SheetDto =
            {
              name : sheetItem
            } 
            let sub =this.Callapi.CreatSheet(sheet).subscribe({
            next:(res)=>{
                sub.unsubscribe();
                this.swal.showSuccess();
                this.SheetListRef.SheetList();
            },
            error :(err)=>
            {
                sub.unsubscribe();
                this.swal.showWoringSave("you are save this item befor");
            }
          });
  }
  
}

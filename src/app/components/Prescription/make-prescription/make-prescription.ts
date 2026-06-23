import { Component , signal } from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DTODrug} from '../../../interfaces/dtodrug';

@Component({
  selector: 'app-make-prescription',
  imports: [FormsModule],
  templateUrl: './make-prescription.html',
  styleUrl: './make-prescription.css',
})

export class MakePrescription 
{
  public DTODrugs = signal<DTODrug[]>([]);

  inputValue = signal<string>('');
  
  constructor(private Callapi : Callapi ,
              private Verfication :VerfivationToken ,
              private router: Router,
              private route: ActivatedRoute,
              private swal: SwalAlert){}


  ngOnInit():void{
    if(this.Verfication.islogin() == false){
        this.router.navigate(['/Login']);
      }
    else
      {             
      }
    }

    
  public SearchDrug(SearchTerm :string) : void
  {
    let sub = this.Callapi.SearchDrugs(SearchTerm).subscribe({
      next:(res : DTODrug[])=>{
        this.DTODrugs.set(res);
        sub.unsubscribe(); 
      },error :(err)=>{
        sub.unsubscribe(); 
      }
     })
  }

}

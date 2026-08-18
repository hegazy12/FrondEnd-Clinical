import { Component , Signal, signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {VitalSignDto1,VitalSignDtoResponse} from '../../../interfaces/vital-dto'

@Component({
  selector: 'app-creat-vital',
  imports: [],
  templateUrl: './creat-vital.html',
  styleUrl: './creat-vital.css',
})
export class CreatVital {

  appointmentId : string;
  public VitalS = signal<VitalSignDto1[]>([]);
public Vital = signal<VitalSignDto1 | undefined>(undefined);

  constructor(private Callapi : Callapi ,private Verfication :VerfivationToken ,private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {
                   this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
                }

    
                ngOnInit():void{
                if(this.Verfication.islogin() == false){
                    this.router.navigate(['/Login']);
                  }
                else
                  {   
                  }
                }

                public SearchVital(SearchTerm :string) : void
                  {
                    let sub = this.Callapi.SearchVitals(SearchTerm).subscribe({
                      next:(res : VitalSignDtoResponse)=>{
                        this.VitalS.set(res.data);
                        sub.unsubscribe(); 
                      },error :(err)=>{
                        sub.unsubscribe(); 
                      }
                    })
                  }

                public AddVitalInView(vitalid: string): void {
                const selectedVital = this.VitalS().find(m => m.id === vitalid);
                this.Vital.set(selectedVital);
              }
}

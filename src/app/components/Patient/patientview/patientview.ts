import { Component, OnInit, signal, inject } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Patient } from '../../../interfaces/patient-create';
import {CCreateAppintment} from '../../Appointment/ccreate-appintment/ccreate-appintment';
import {ListAppintment} from '../../Appointment/list-appintment/list-appintment';
import { PatientResponse,PatientDTO } from '../../../interfaces/patient-response';

@Component({
  selector: 'app-patientview',
  standalone: true, // تأكد إنها true
  imports: [Navbar,CCreateAppintment,ListAppintment],
  templateUrl: './patientview.html',
  styleUrl: './patientview.css',
})

export class Patientview
{
    
  constructor(private Callapi :Callapi , private Verfivation :VerfivationToken,private router :Router,private route: ActivatedRoute)
  {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
  }
    
    public patientId : string = "";
    public Patient = signal<PatientDTO | null>(null);
    
    ngOnInit():void{
          if(this.Verfivation.islogin() == false)
          {
            this.router.navigate(['/Login']);
          }
          else
          {
            this.getPatient(this.patientId);
          }
        }


        public getPatient(id : string ) : boolean
        {
            let Sup = this.Callapi.GetPatient(id).subscribe({
              next: (P : PatientResponse) =>
                {
                    this.Patient.set(P.data);
                    Sup.unsubscribe();
                },
              error: (err) => {
                Sup.unsubscribe();
                this.router.navigate(['/Login']);
              }
            });
            return true;
        }
}

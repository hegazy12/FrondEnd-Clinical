import { Component ,signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../../../interfaces/patient-create';
import { CommonModule } from '@angular/common'; 
import { PatientDTO, PatientsResponse } from '../../../interfaces/patient-response';
@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-patient.html',
  styleUrl: './list-patient.css',
})

export class ListPatient
{
      constructor(private Callapi : Callapi, private Verfication :VerfivationToken ,private router : Router){}
      
      public Patients = signal<Patient[]>([]);
      public isloding = signal<boolean>(false);
      public PatientsResponse = signal<PatientsResponse | null>(null);
      public PatientsData = signal<PatientDTO[] | null>(null);

      ngOnInit():void
      {
        console.log(" ListPatient: ngOnInit");
        if(this.Verfication.islogin() == false){
            this.router.navigate(['/Login']);
          }
        else
        {
        //  this.getPatients(1);
          this.getPatientsNew();
        }
      }
        
      public getPatients(numberpage : number) : boolean
      {
             let Sup = this.Callapi.getpatients(numberpage).subscribe({
              next: (P : Patient[]) =>
                {
                    this.Patients.set(P);
                    console.log(P); 
                    Sup.unsubscribe();
                    this.isloding.set(true);

                    console.log("this.isloding" + this.isloding);
                },
              error: (err) => {
                console.error(err); 
                Sup.unsubscribe();
                this.router.navigate(['/Login']);
              }
            });
            return true;
    }
    
      public getPatientsNew() : boolean
      {
             let Sup = this.Callapi.getPatientsNew().subscribe({
              next: (P : PatientsResponse) =>
                {
                    this.PatientsResponse.set(P);
                    this.PatientsData.set(P.data);
                    Sup.unsubscribe();
                    this.isloding.set(true);
                    console.log("this.isloding" + this.isloding);
                },
              error: (err) => {
                console.error(err); 
                Sup.unsubscribe();
                this.router.navigate(['/Login']);
              }
            });
            return true;
    }
}

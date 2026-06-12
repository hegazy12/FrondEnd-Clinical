import { Component ,signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../../../interfaces/patient-create';
import { CommonModule } from '@angular/common'; 

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

      ngOnInit():void
      {
        console.log(" ListPatient: ngOnInit");
        if(this.Verfication.islogin() == false){
            this.router.navigate(['/Login']);
          }
        else
        {
          this.getPatients(1);
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

}

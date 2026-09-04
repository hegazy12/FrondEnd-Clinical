import { Component ,signal } from '@angular/core';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, RouterLink } from '@angular/router';
import { Patient } from '../../../interfaces/patient-create';
import { CommonModule } from '@angular/common'; 
import { PatientDTO, PatientsResponse } from '../../../interfaces/patient-response';
import {  AfterViewInit, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './list-patient.html',
  styleUrl: './list-patient.css',
})

export class ListPatient
{

      displayedColumns: string[] = ['FirstName', 'LastName', 'Address', 'phoneNumber', 'Gender', 'dateOfBirth', 'actions'];

      constructor(private Callapi : Callapi, private Verfication :VerfivationToken ,private router : Router){
         //this.getPatientsNew();
      }
      public PatientsData = signal<PatientDTO[] | undefined>(undefined);   
      dataSource = new MatTableDataSource<PatientDTO>(this.PatientsData());
      private nextId = 10;

      public Patients = signal<Patient[]>([]);
      public isloding = signal<boolean>(false);
      public PatientsResponse = signal<PatientsResponse | null>(null);
      
      readonly sort = viewChild.required(MatSort);
      readonly paginator = viewChild.required(MatPaginator);

      ngOnInit():void
      {
        console.log(" ListPatient: ngOnInit");
        if(this.Verfication.islogin() == false){
            this.router.navigate(['/Login']);
          }
        else
        {
          //this.getPatients(1);
          this.getPatientsNew();
          this.dataSource = new MatTableDataSource<PatientDTO>(this.PatientsData());
        }
      }

      ngAfterViewInit() {
        this.dataSource.sort = this.sort();
        this.dataSource.paginator = this.paginator();
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
        }
      }

        addUser() {
        // const newUser: User = {
        //   id: this.nextId++,
        //   name: 'مستخدم جديد',
        //   email: `user${this.nextId}@example.com`,
        //   role: 'User'
        // };
        // const updated = [...this.dataSource.data, newUser];
        // this.dataSource.data = updated;
        // if (this.dataSource.paginator) {
        //   this.dataSource.paginator.lastPage();
        // }
      }

      editUser(PatientDTO: PatientDTO) {
        // hook this up to a dialog / route as needed
        //console.log('Edit user:', user);
      }

      deleteUser(PatientDTO: PatientDTO) {
      // const updated = this.dataSource.data.filter(u => u.id !== user.id);
      // this.dataSource.data = updated;
      }

      
      //   public getPatients(numberpage : number) : boolean
      //   {
      //        let Sup = this.Callapi.getpatients(numberpage).subscribe({
      //           next: (P : Patient[]) =>
      //             {
      //                 this.Patients.set(P);
      //                 console.log(P); 
      //                 Sup.unsubscribe();
      //                 this.isloding.set(true);
      //                 console.log("this.isloding" + this.isloding);
      //             },
      //           error: (err) => {
      //             console.error(err); 
      //             Sup.unsubscribe();
      //             this.router.navigate(['/Login']);
      //           }
      //         });
      //         return true;
      // }
    
      public getPatientsNew() 
      {
        let Sup = this.Callapi.getPatientsNew().subscribe({
        next: (P : PatientsResponse) =>
          {
              this.PatientsResponse.set(P);
              this.PatientsData.set(P.data);
               this.dataSource.data = P.data;
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
    }
}

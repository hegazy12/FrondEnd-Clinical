import { Component , ViewChild } from '@angular/core';
import { Navbar } from '../../navbar/navbar'
import { FormsModule } from '@angular/forms';
import { PatientCreate } from '../../../interfaces/patient-create'
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token'
import { Router } from '@angular/router';
import { ListPatient } from '../list-patient/list-patient';
import{  SwalAlert } from '../../../services/swalAlert/swal-alert';

@Component({
  selector: 'app-create-patient',
  imports: [Navbar,FormsModule,ListPatient],
  templateUrl: './create-patient.html',
  styleUrl: './create-patient.css',
})

export class CreatePatient 
{
    @ViewChild(ListPatient) ListPatienttRef!: ListPatient;
   
   
    public Fristname : string ='';
    public LastName  : string = '';
    public Phone     : string= '';
    public Address   : string= '';
    public DateOfBirth : string= '';
    public gender : string= '';
    public isLoading :boolean = false;
    public refrishvalue : boolean= false;

    constructor(private Callapi : Callapi ,private Verfication :VerfivationToken ,private router: Router,private swal: SwalAlert){
      
    }
    
   

    ngOnInit():void{
     if(this.Verfication.islogin() == false)
      {
        console.log("CreatePatient SSS " + this.Verfication.islogin());
        this.router.navigate(['/Login']);
      }
      else
      {
        console.log("CreatePatient state "  + this.Verfication.islogin());
        this.refrishvalue = false;
      }
    }
    
    public makefildesEmpty() :void
    {
     this.Fristname  ='';
     this.LastName  = '';
     this.Phone    = '';
     this.Address = '';
     this.DateOfBirth = '';
    }



    public onSubmit() :void
    {
     this.isLoading = true;
    
      let Patint : PatientCreate ={ 
      firstName :this.Fristname ,
      lastName : this.LastName,
      phoneNumber : this.Phone, 
      dateOfBirth : this.DateOfBirth,
      address : this.Address, 
      gender : this.gender};

      console.log(Patint);
      if(Patint.firstName == "")
      {
        this.swal.showWoringSave("please inter Fristname for patient");
        this.isLoading = false;
      }
      else if(Patint.lastName == "")
      {
        this.swal.showWoringSave("Please inter Lastname for patient");
        this.isLoading = false;
      }else if(Patint.dateOfBirth == ""){
        this.swal.showWoringSave("Please inter dateOfBirth for patient");
        this.isLoading = false;

      }else if(Patint.gender == ""){
        this.swal.showWoringSave("Please select gender for patient");
        this.isLoading = false;
      }else if(Patint.phoneNumber == ""){
        this.swal.showWoringSave("Please inter phoneNumber for patient");
        this.isLoading = false;
      } else{

     this.makefildesEmpty();
    
     let sub = this.Callapi.createPatient(Patint).subscribe({
      next: (res) => {
        console.log('Successfully created:', res);
         sub.unsubscribe(); 
         this.swal.showSuccess();  
         this.isLoading = false;

         this.ListPatienttRef.getPatientsNew();

      },
      error: (err) => {console.error(err); sub.unsubscribe(); this.isLoading = false; } 
    });
  }
  }
}
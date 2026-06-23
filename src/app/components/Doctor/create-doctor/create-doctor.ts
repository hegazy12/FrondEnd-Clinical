import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken} from '../../../services/verfivationToken/verfivation-token'
import { Router } from '@angular/router';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { createDoctors } from '../../../interfaces/CreateDoctor'

@Component({
  selector: 'app-create-doctor',
  imports: [FormsModule],
  templateUrl: './create-doctor.html',
  styleUrl: './create-doctor.css',
})

export class CreateDoctor 
{
   public Userid :string = "" ;
   public fristName: string = ""; 
   public lastName: string = "";
   public specialization: string= "";
   public isLoading : boolean = false;

    constructor(
        private Callapi : Callapi,
        private Verfication :VerfivationToken,
        private router: Router,
        private swal: SwalAlert, ){}
    
    ngOnInit():void {
        if(this.Verfication.islogin() == false)
        {
            this.router.navigate(['/Login']);
        }
        else
        {

        }
    }

    onSubmit(){
       this.isLoading = true; 
       let Create : createDoctors ={firstName :this.fristName , 
                                    lastName : this.lastName , 
                                    specialization : this.specialization ,
                                    Userid : this.Userid };
        
        let sub =this.Callapi.createDoctor(Create).subscribe({
            next:(res)=>{
                sub.unsubscribe();
                this.swal.showSuccess();
                this.isLoading = false;
            },
            error :(err)=>{
                sub.unsubscribe();
                this.isLoading = false;   
            }
        });
    }

}
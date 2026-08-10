import { Component , signal } from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DTODrug} from '../../../interfaces/dtodrug';
import {Prescriptiondto} from '../../../interfaces/prescription'
import { parse } from 'path';
import {PrescriptionList } from '../prescription-list/prescription-list'


@Component({
  selector: 'app-make-prescription',
  imports: [FormsModule,PrescriptionList],
  templateUrl: './make-prescription.html',
  styleUrl: './make-prescription.css',
})

export class MakePrescription 
{
  public DTODrugs = signal<DTODrug[]>([]);
  public from : Date| string=""; 
  public to : Date| string=""; 
  public Note = signal<string | null>(null);
  public Frequency = signal<number | null>(6);
  public type = signal<number| null>(1);
  DrugId =signal<string>('28DBB348-5C7A-47F8-A601-246A600BA075');
  appointmentId : string;
  inputValue = signal<string>('');
  
  constructor(private Callapi : Callapi ,
              private Verfication :VerfivationToken ,
              private router: Router,
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

     onSpecialtyChange(event: Event) {
       const element = event.target as HTMLSelectElement;
        if(element.name =="frequency") 
        {
           this.Frequency.set(Number(element.value));
           console.log("Frequency = " + this.Frequency);
           
        }else if(element.name == "type")
        {
            this.type.set(Number(element.value));
             console.log("Frequency = " + this.type);
        }else if(element.name == "drug")
        {
            this.DrugId.set(element.value);
             console.log("Frequency = " + this.DrugId);
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

  public onSubmit() : void
  {
      let Pres :Prescriptiondto =
       {drugId : this.DrugId(),
        from: this.from ,
        to:this.to, 
        appointmentId : this.appointmentId, 
        frequency : this.Frequency(),
        type :this.type(),
        notes :""
      };

       this.Create(Pres);
    }

  


   public Create(Pres :Prescriptiondto) : boolean {
      let sub =this.Callapi.CreatPrescription(Pres).subscribe({
            next:(res)=>{
                sub.unsubscribe();
                this.swal.showSuccess();
                return true;
            },
            error :(err)=>{
                sub.unsubscribe();
                return false;
            }
        });
        return true;
    }

  }
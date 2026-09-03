import { Component , ElementRef, Input, Renderer2, signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DTODrug } from '../../../interfaces/dtodrug';
import { Prescriptiondto} from '../../../interfaces/prescription'
import { PrescriptionList } from '../prescription-list/prescription-list'


@Component({
  selector: 'app-make-prescription',
  imports: [FormsModule,PrescriptionList],
  templateUrl: './make-prescription.html',
  styleUrl: './make-prescription.css',
})

export class MakePrescription 
{
  @ViewChild(PrescriptionList) prescriptionListRef!: PrescriptionList;
  @ViewChild('targetBox') box!: ElementRef<HTMLElement>;
  @Input({ required: true }) AppointmentID!: string;
  //@Input({ required: true }) Appointment!: string;

  public DTODrugs = signal<DTODrug[]>([]);
  public from = signal<Date |string>(''); 
  public to = signal<Date |string>(''); 
  public Note = signal<string | null>(null);
  public Frequency = signal<number | null>(6);
  public type = signal<number| null>(1);
  DrugId =signal<string>('');
  public appointmentId : string;
  inputValue = signal<string>('');

  public isHistory = signal<number>(0);
  
  constructor(private Callapi : Callapi ,
              private Verfication :VerfivationToken ,
              private router: Router,
              private route: ActivatedRoute,
              private swal: SwalAlert,
              private renderer: Renderer2)
              {
                 this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
              }


  ngOnInit():void{
    if(this.Verfication.islogin() == false){
        this.router.navigate(['/Login']);
      }
    else
      {   
         this.from.set(new Date().toISOString().split('T')[0]);
         this.to.set(new Date().toISOString().split('T')[0]);

      }
    }

     onSpecialtyChange(event: Event) {
       const element = event.target as HTMLSelectElement;
         console.log("element.name = " + element.name);
       if(element.name =="frequency") 
        {
           this.Frequency.set(Number(element.value));
           console.log("Frequency = " + this.Frequency);
           
        }else if(element.name == "type")
        {
            this.type.set(Number(element.value));
             console.log("type = " + this.type());
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
        from: this.from() ,
        to:this.to(), 
        appointmentId : this.appointmentId, 
        frequency : this.Frequency(),
        type :this.type(),
        notes :this.Note(),
        last : this.isHistory()
      };
      console.log(Pres);
      if(Pres.drugId == ""){
        this.swal.showWoringSave("Please select drug");
      }
      else if(Pres.frequency == 0){
         this.swal.showWoringSave("Please select frequency");
      }
      else if(Pres.from == "") {
           this.swal.showWoringSave("Please entar start date");
      }else if(Pres.to == "") {
          this.swal.showWoringSave("Please entar end date");
      }
      else if(Pres.type == 0){
         this.swal.showWoringSave("Please select type");
      }
      else{
         this.Create(Pres);
      }
      //this.PrescriptionList!.GetPrescriptionList(this.appointmentId);
    }

  public Create(Pres :Prescriptiondto)  {
      let sub =this.Callapi.CreatPrescription(Pres).subscribe({
            next:(res)=>{
                sub.unsubscribe();
                if (res.success) 
                  {
                        this.swal.showSuccess();
                    if (this.prescriptionListRef) {
                        this.prescriptionListRef.GetPrescriptionList(this.appointmentId,this.isHistory());
                  } else {
                        console.warn('PrescriptionList component is not present in the DOM.');
                  }
                } else {
                       
                        this.swal.showWoringSave(res.message);
                }
            },
            error :(err)=>{
                this.swal.showWoringSave(err.error.message)
                sub.unsubscribe();
            }
        });
    }
    
    public async makePriscriptionHistory()
    {
    
      if(this.isHistory() == 0)
      {
          this.from.set('');
          this.isHistory.set(1);
          await this.prescriptionListRef.GetPrescriptionList(this.appointmentId,this.isHistory());
          this.to.set(''); 
          this.Frequency.set(6);
          this.type.set(0);
          this.Note.set('');
      }
      else
      {
          this.from.set(new Date().toISOString().split('T')[0]);
          this.isHistory.set(0); 
          this.prescriptionListRef.GetPrescriptionList(this.appointmentId,this.isHistory());
      }
    }
  }
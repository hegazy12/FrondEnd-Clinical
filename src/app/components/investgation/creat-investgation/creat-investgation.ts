import { Component , signal , ViewChild} from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import { MedicalExaminationsResponse ,MedicalExaminationsDTO,saveMedicalExaminationDTO } from '../../../interfaces/medical-examinations-dto';
import { FormsModule } from '@angular/forms';
import { ListInvestgation } from '../list-investgation/list-investgation'
@Component({
  selector: 'app-creat-investgation',
  imports: [FormsModule,ListInvestgation],
  templateUrl: './creat-investgation.html',
  styleUrl: './creat-investgation.css',
})
export class CreatInvestgation
{
    @ViewChild(ListInvestgation) ListInvestgationRef!: ListInvestgation;

    public appointmentId : string;
    MedicalExaminationsid :string="";
    public MedicalExaminations = signal<MedicalExaminationsResponse  | null>(null);
    public Examinations = signal<MedicalExaminationsDTO[]>([]);
    public MedicalExaminationsDTO = signal<MedicalExaminationsDTO | null|undefined>(null)

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
        
      public SearchExaminations(SearchTerm :string) : void
      {
        let sub = this.Callapi.SearchMedicalExaminations(SearchTerm).subscribe({
          next:(res : MedicalExaminationsResponse)=>{
            this.Examinations.set(res.data);
            sub.unsubscribe(); 
          },error :(err)=>{
            sub.unsubscribe(); 
          }
         })
      }

      onSpecialtyChange(event: Event)
       {
          const element = event.target as HTMLSelectElement;
          let x =this.Examinations().find(m=> m.id == element.value);
          this.MedicalExaminationsDTO.set(x);
          this.MedicalExaminationsid = element.value;
       }

      public onSubmit()
      {
        let create : saveMedicalExaminationDTO =
        {
          idAppointment : this.appointmentId,
          idExamination : this.MedicalExaminationsid

        };
        if(create.idExamination == "")
        {
          this.swal.showWoringSave("Pleas select Examination");
        } else {
          this.Create(create);
        }
      }

      public Create(Pres :saveMedicalExaminationDTO)  {
            let sub =this.Callapi.createExamination (Pres).subscribe({
                  next:(res)=>{
                      sub.unsubscribe();
                      this.swal.showSuccess();
                      this.ListInvestgationRef.GetInvestgationlist(this.appointmentId);
                      // Safe call check
                      // if (this.prescriptionListRef) {
                      //   this.prescriptionListRef.GetPrescriptionList(this.appointmentId);
                      // } else {
                      //   console.warn('PrescriptionList component is not present in the DOM.');
                      // }
                  },
                  error :(err)=>{
                      this.swal.showWoringSave(err.error.message)
                      sub.unsubscribe();
                  }
              });
          }
}

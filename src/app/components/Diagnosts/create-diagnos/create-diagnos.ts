import { Component, Input, signal, ViewChild } from '@angular/core';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { CreateDiagnosDTO, CreateDiagnosisResponse, GetDiagnosisMasterResponse, MasterDiagnosDTO1 } from '../../../interfaces/diagnos-dto';
import { FormsModule } from '@angular/forms';
import { ListDiagnosos } from '../list-diagnosos/list-diagnosos';

@Component({
  selector: 'app-create-diagnos',
  imports: [FormsModule,ListDiagnosos],
  templateUrl: './create-diagnos.html',
  styleUrl: './create-diagnos.css',
})

export class CreateDiagnos
{
    @Input({ required: true }) AppointmentID!: string;
    @ViewChild(ListDiagnosos) ListDiagnososRef!: ListDiagnosos;
    
    public CreateDiagnosisResponse = signal<CreateDiagnosisResponse  | null>(null);
    public GetDiagnosisMasterResponse = signal<GetDiagnosisMasterResponse  | null>(null);
    public data = signal<MasterDiagnosDTO1[]>([]);
    public SelectedData = signal<MasterDiagnosDTO1|null |undefined>(null);
    public appointmentId : string;
    public Note = signal<string | null>(null);
    public name = signal<string | null>(null);
    
    constructor(private callapi : Callapi,
                private router : Router,
                private route : ActivatedRoute,
                private Vervication : VerfivationToken,
                private swal : SwalAlert )
                {
                    this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
                }
    
    ngOnInit():void{
     if(this.Vervication.islogin() == false)
        {
          this.router.navigate(['/Login']);
        }
        else
        {
          console.log("CreatePatient state "  + this.Vervication.islogin());
        }
      }
      
      public async Create(DiagnosDTO :CreateDiagnosDTO)  
      {
        let sub =this.callapi.CreateMasterDiagnos(DiagnosDTO).subscribe({
          next:(res)=>{
            if(res.success == true)
              {
                this.ListDiagnososRef.GetDiagnososlist(this.appointmentId);
                sub.unsubscribe();
                this.swal.showSuccess();
              }
              else
              {
                this.ListDiagnososRef.GetDiagnososlist(this.appointmentId);
                sub.unsubscribe();
                this.swal.showWoringSave(res.message);
              }                         
          },
          error :(err)=>{
              this.swal.showWoringSave(err.error.message)
              sub.unsubscribe();
          }
      });
      }

      onSpecialtyChange(event: Event)
      {
          const element = event.target as HTMLSelectElement;
          console.log(element.value);
          this.SelectedData.set(this.data().find(m=> m.id == element.value) || null);
          this.name.set(this.SelectedData()?.name || null);
          console.log(this.SelectedData());
      }
      
      public searchDiagnos(SearchTerm:string)
      {
        let sub = this.callapi.SearchDiagnos(SearchTerm).subscribe({
          next:(res)=>{
            if(res.success == true)
              { 
                sub.unsubscribe();
                console.log(res.data);
                this.data.set(res.data);
              }
              else
              {
                sub.unsubscribe();
                this.swal.showWoringSave(res.message);
              }                         
          },
          error :(err)=>
            {
              this.swal.showWoringSave(err.error.message)
              sub.unsubscribe();
            }
        });
      }

      async onSubmit()
      {
        this.SelectedData.set(this.data().find(m=> m.name ==this.name()) || null);
        if(this.SelectedData())
        {
          const diagnosDTO : CreateDiagnosDTO =
          {
            id: this.SelectedData()!.id,
            name: this.name(),
            note : this.Note() || '',
            appointmentId: this.appointmentId
          };
          await this.Create(diagnosDTO);
        } 
        else
        {
          const diagnosDTO : CreateDiagnosDTO =
          {
            id: "",
            name: this.name(),
            note : this.Note() || '',
            appointmentId: this.appointmentId
          };
          await this.Create(diagnosDTO);
        }
        //this.ListDiagnososRef.GetDiagnososlist(this.appointmentId);
      }
}
    


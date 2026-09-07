import { Component , ElementRef, signal, ViewChild } from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router , ActivatedRoute } from '@angular/router';
import {saveVitalSignDto, saveVitalSignDto1, VitalSignDto1 , VitalSignDtoResponse} from '../../../interfaces/vital-dto'
import { ListVital } from '../list-vital/list-vital';

@Component({
  selector: 'app-creat-vital',
  imports: [ListVital],
  templateUrl: './creat-vital.html',
  styleUrl: './creat-vital.css',
})
export class CreatVital {

  public appointmentId : string;
  public VitalS = signal<VitalSignDto1[]>([]);
  
  public Vital = signal<VitalSignDto1 | undefined>(undefined);
  
  public saveVitalSignDto1 =signal<saveVitalSignDto1 |null> (null);

  @ViewChild(ListVital) ListVitalRef!: ListVital;
  

  constructor(  private Callapi : Callapi ,
                private Verfication :VerfivationToken ,
                private router: Router,
                private route: ActivatedRoute,
                private swal: SwalAlert)
                {
                  this.appointmentId = this.route.snapshot.paramMap.get('id') || '';
                }

    ngOnInit():void{
    if(this.Verfication.islogin() == false)
      {
        this.router.navigate(['/Login']);
      }
    else
      {

      }
    }

    public SearchVital(SearchTerm :string) : void
      {
        let sub = this.Callapi.SearchVitals(SearchTerm).subscribe({
          next:(res : VitalSignDtoResponse)=>{
            this.VitalS.set(res.data);
            sub.unsubscribe(); 
          },error :(err)=>{
            sub.unsubscribe(); 
          }
        })
      }

     // @ViewChild('vitalContainer') vitalContainer!: ElementRef<HTMLDivElement>;  
    public AddVitalInView(vitalid: string): void {
        const selectedVital = this.VitalS().find(m => m.id === vitalid);
        this.Vital.set(selectedVital);
    }

    public async Create(saveDTO :saveVitalSignDto)  
    {
      let sub =this.Callapi.saveVitalSign(saveDTO).subscribe({
        next:(res)=>{
          if(res.success == true)
            {
              sub.unsubscribe();
              this.swal.showSuccess();
              this.ListVitalRef.GetsaveVitalSighAppoinmenById(this.appointmentId);
            }
            else
            {
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
    
    @ViewChild('vitalContainer') vitalContainer!: ElementRef<HTMLDivElement>;

    getVitalValue(): string | null 
    {
        const container = this.vitalContainer?.nativeElement;
        if (!container) return null;
        const type = this.Vital()?.dataTypeName;
        
        if (type === 'Boolean')
          {
            const checked = container.querySelector<HTMLInputElement>('input[name="vitalvalue"]:checked');
            return checked ? checked.value : null;
          }

        const field = container.querySelector<HTMLInputElement | HTMLSelectElement>('[name="vitalvalue"]');
        return field ? field.value : null;
    }

    onSaveVital(): void {
        const value = this.getVitalValue();
        if (value === null || value === '') {
            console.warn('لازم تدخل قيمة قبل الحفظ');
            return;
        }
        
        console.log('Vital value:', value);

        const saveDTO : saveVitalSignDto = 
        {
          appointmentId : this.appointmentId,
          value : value,
          vitalSignId : this.Vital()?.id
        }
        this.Create(saveDTO);
    }

}
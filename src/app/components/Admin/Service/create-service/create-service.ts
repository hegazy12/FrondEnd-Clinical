import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Callapi } from '../../../../services/callapi/callapi';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { ServiceDTO } from '../../../../interfaces/service-dto';
import { ExaminationFindingDTO1 } from '../../../../interfaces/examination-finding';
import { MedicalExaminationsDTO, MedicalExaminationsResponse } from '../../../../interfaces/medical-examinations-dto';
import { ListService } from '../list-service/list-service';

@Component({
  selector: 'app-create-service',
  imports: [ListService],
  templateUrl: './create-service.html',
  styleUrl: './create-service.css',
})
export class CreateService {

  @ViewChild('serviceName') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('servicePrice') priceInput!: ElementRef<HTMLInputElement>;
  @ViewChild('serviceDescription') descriptionInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('examinationFindingSelect') examinationFindingSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('medicalExaminationSelect') medicalExaminationSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild(ListService) ListServiceRef!: ListService;

  // Examination Finding -> examinationId
  public ExaminationFindings = signal<ExaminationFindingDTO1[]>([]);
  public examinationId = signal<string>('');

  // Lab / Rad -> medicalExaminationId
  public Examinations = signal<MedicalExaminationsDTO[]>([]);
  public medicalExaminationId = signal<string>('');

  constructor(private callapi: Callapi,
    private swal: SwalAlert) {
  }

  public GetExaminationFindingBySearchTearm(Tearm: string): void {
    let sub = this.callapi.GetExaminationFindingBySearchTearm(Tearm).subscribe({
      next: (res) => {
        if (res.success == true) {
          this.ExaminationFindings.set(res.data);
        }
        else {
          this.swal.showWoringSave(res.message);
        }
        sub.unsubscribe();
      },
      error: (err) => {
        this.swal.showWoringSave(err.error?.message)
        sub.unsubscribe();
      }
    });
  }

  public SearchExaminations(SearchTerm: string): void {
    let sub = this.callapi.SearchMedicalExaminations(SearchTerm).subscribe({
      next: (res: MedicalExaminationsResponse) => {
        this.Examinations.set(res.data);
        sub.unsubscribe();
      },
      error: (err) => {
        sub.unsubscribe();
      }
    });
  }

  onExaminationFindingChange(event: Event) {
    this.examinationId.set((event.target as HTMLSelectElement).value);
  }

  onMedicalExaminationChange(event: Event) {
    this.medicalExaminationId.set((event.target as HTMLSelectElement).value);
  }

  AddService(name: string, price: string, description: string) {
    const service: ServiceDTO = {
      name: name,
      description: description,
      price: Number(price) || 0,
      examinationId: this.examinationId() || null,
      medicalExaminationId: this.medicalExaminationId() || null
    };

    const sub = this.callapi.AddService(service).subscribe({
      next: (response) => {
        sub.unsubscribe();
        this.swal.showSuccess();
        this.resetForm();
        this.ListServiceRef.GetAllService();
      },
      error: (err) => {
        sub.unsubscribe();
        this.swal.showWoringSave(err.error?.message);
      }
    });
  }

  private resetForm() {
    this.nameInput.nativeElement.value = '';
    this.priceInput.nativeElement.value = '';
    this.descriptionInput.nativeElement.value = '';
    this.examinationFindingSelect.nativeElement.value = '';
    this.medicalExaminationSelect.nativeElement.value = '';
    this.examinationId.set('');
    this.medicalExaminationId.set('');
  }

}

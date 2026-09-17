import { Component, ElementRef, ViewChild } from '@angular/core';
import { Callapi } from '../../../../services/callapi/callapi';
import { ExaminationFindingDTO } from '../../../../interfaces/examination-finding';
import { ListExaminationFinding } from '../list-examination-finding/list-examination-finding';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';

@Component({
  selector: 'app-create-examination-finding',
  imports: [ListExaminationFinding],
  templateUrl: './create-examination-finding.html',
  styleUrl: './create-examination-finding.css',
})
export class CreateExaminationFinding {

  @ViewChild('examinationFindingname') examinationFindingNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionId') descriptionInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild(ListExaminationFinding) ListExaminationFindingRef!: ListExaminationFinding;

  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) {
  }

  AddExaminationFinding(name: string, description: string) {
    const examinationFinding: ExaminationFindingDTO = {
      name: name,
      description: description
    };
    console.log(examinationFinding);

    const sub = this.callapi.CreateExaminationFinding(examinationFinding).subscribe({
      next: (response) => {
        sub.unsubscribe();
        this.swal.showSuccess();
        if (this.examinationFindingNameInput?.nativeElement) {
          this.examinationFindingNameInput.nativeElement.value = '';
        }
        if (this.descriptionInput?.nativeElement) {
          this.descriptionInput.nativeElement.value = '';
        }
        this.ListExaminationFindingRef.GetAllExaminationFinding();
      },
      error: (error) => {
        sub.unsubscribe();
        this.swal.showWoringSave("you are save this item befor");
      }
    });
  }

}

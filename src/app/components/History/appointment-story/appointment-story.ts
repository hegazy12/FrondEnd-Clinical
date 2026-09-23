import { Component, Input, signal, ViewChild } from '@angular/core';
import { SwalAlert } from '../../../services/swalAlert/swal-alert';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentDTO3, AppointmentsStoryResponse } from '../../../interfaces/appointment-dto-0';
import { ListInvestgation } from '../../investgation/list-investgation/list-investgation';
import { PrescriptionList } from '../../Prescription/prescription-list/prescription-list';
import { ListDiagnosos } from '../../Diagnosts/list-diagnosos/list-diagnosos';
import { ListVital } from '../../vital/list-vital/list-vital';
import { SheetDto1, SheetsInAppointmentSavedResponse } from '../../../interfaces/sheet-dto';
import { SaveAnswerQuestion } from '../../Doctor/History/Question/save-answer-question/save-answer-question';
import { ListSaveExaminationFinding } from '../../ExaminationFinding/list-save-examination-finding/list-save-examination-finding';
import { ListChifCompline } from '../../ChifCompline/list-chif-compline/list-chif-compline';

@Component({
  selector: 'app-appointment-story',
  imports: [ListInvestgation, ListChifCompline, PrescriptionList, ListDiagnosos, ListVital, SaveAnswerQuestion, ListSaveExaminationFinding],
  templateUrl: './appointment-story.html',
  styleUrl: './appointment-story.css',
})
export class AppointmentStory {
  public AppointmentDTO3 = signal<AppointmentDTO3 | undefined>(undefined);
  public isHistory = signal<number>(0);
  @Input({ required: true }) AppointmentID!: string;
  public appointmentid = signal<string>('');
  @ViewChild(ListInvestgation) ListInvestgationRef!: ListInvestgation;
  @ViewChild(PrescriptionList) prescriptionListRef!: PrescriptionList;
  @ViewChild(ListDiagnosos) listDiagnososRef!: ListDiagnosos;
  @ViewChild(ListVital) ListVitalRef!: ListVital;
  @ViewChild(ListSaveExaminationFinding) listSaveExaminationFindingRef!: ListSaveExaminationFinding;
  @ViewChild(SaveAnswerQuestion) saveAnswerQuestionRef!: SaveAnswerQuestion;
  @ViewChild(ListChifCompline) listChifComplineRef!: ListChifCompline;


  public Sheet = signal<SheetDto1[] | undefined>(undefined);


  public SelectSheet = signal<SheetDto1[] | undefined>(undefined);

  constructor(private Callapi: Callapi,
    private Verfication: VerfivationToken,
    private router: Router,
    private route: ActivatedRoute,
    private swal: SwalAlert) {

  }

  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {
      this.router.navigate(['/Login']);
    }
    else {
      if (this.AppointmentID != "") {
        this.GetAppoinmentStory(this.AppointmentID);
      }
    }
  }

  public GetAppoinmentStory(AppointmentID: string): boolean {
    let Sup = this.Callapi.GetAppoinmentStory(AppointmentID).subscribe({
      next: (P: AppointmentsStoryResponse) => {
        this.AppointmentDTO3.set(P.data);
        this.ListInvestgationRef.GetInvestgationlist(AppointmentID, 0);
        this.prescriptionListRef.GetPrescriptionList(AppointmentID, 0);
        this.listDiagnososRef.GetDiagnososlist(AppointmentID);
        this.GetSheetsInAppointmentSaved(AppointmentID);
        this.listSaveExaminationFindingRef.getdata(AppointmentID);
        this.appointmentid.set(AppointmentID);
        this.ListVitalRef.GetsaveVitalSighAppoinmenById(AppointmentID);
        this.listChifComplineRef.GetChifComplineList(AppointmentID);
        this.SelectSheet.set(undefined);
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
    return true;
  }

  public GitHistory() {
    if (this.isHistory() == 1) {
      this.isHistory.set(0);
      this.ListInvestgationRef.GetInvestgationlist(this.appointmentid(), this.isHistory());
      this.prescriptionListRef.GetPrescriptionList(this.appointmentid(), this.isHistory());
      //  this.listDiagnososRef.GetDiagnososlist(this.appointmentid());
    } else {
      this.isHistory.set(1);
      this.ListInvestgationRef.GetInvestgationlist(this.appointmentid(), this.isHistory());
      this.prescriptionListRef.GetPrescriptionList(this.appointmentid(), this.isHistory());
      //this.listDiagnososRef.GetDiagnososlist(this.appointmentid());
    }
  }

  public GetSheetsInAppointmentSaved(AppointmentID: string): boolean {
    let Sup = this.Callapi.GetSheetsInAppointmentSaved(AppointmentID).subscribe({
      next: (P: SheetsInAppointmentSavedResponse) => {
        this.Sheet.set(P.data);
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
    return true;
  }

  public SetInSelected(SheetID: string) {
    if (SheetID != '') {
      this.SelectSheet.set(this.Sheet()?.filter(m => m.id == SheetID));
      //this.saveAnswerQuestionRef.GetsaveQuestionInSheet(this.appointmentid(), SheetID);
    } else if (SheetID == '') {
      this.SelectSheet.set(this.Sheet());
    }
  }
}
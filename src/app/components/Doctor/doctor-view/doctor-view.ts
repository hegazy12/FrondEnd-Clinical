import { Component, signal } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { DoctorDto1, DoctorResponse } from '../../../interfaces/doctor-dto';

@Component({
  selector: 'app-doctor-view',
  imports: [Navbar],
  templateUrl: './doctor-view.html',
  styleUrl: './doctor-view.css',
})
export class DoctorView {

  public doctorId: string = '';
  public doctor = signal<DoctorDto1 | null>(null);
  public isLoading = signal<boolean>(true);
  public errorMessage = signal<string>('');

  constructor(private callapi: Callapi,private Vervication: VerfivationToken){}

  ngOnInit(): void 
  {
    if (!this.Vervication.islogin()) 
    {
      this.isLoading.set(false);
      this.errorMessage.set('Please log in to view your profile.');
      return;
    }
    
    this.doctorId = this.Vervication.GetDoctorId();
    
    if (!this.doctorId || this.doctorId === 'null' || this.doctorId === 'undefined')
    {
      this.isLoading.set(false);
      this.errorMessage.set('No doctor profile is linked to this account.');
      return;
    }

    this.GetDoctor();
  }

  public GetDoctor(): void 
  {
    this.isLoading.set(true);
    this.errorMessage.set('');
    const sub = this.callapi.GetDoctor(this.doctorId).subscribe({
      next: (res: DoctorResponse) => {
        sub.unsubscribe();
        this.isLoading.set(false);
        if (res.success) {
          this.doctor.set(res.data);
        }
        else {
          this.errorMessage.set(res.message || 'Could not load the doctor profile.');
        }
      },
      error: (err) => {
        sub.unsubscribe();
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Could not load the doctor profile.');
      }
    });
  }

}
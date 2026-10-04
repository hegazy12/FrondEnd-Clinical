import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Callapi } from '../../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../../services/swalAlert/swal-alert';
import { createDoctors } from '../../../../../interfaces/CreateDoctor';
import { User, UserResponse } from '../../../../../interfaces/user-dto';

@Component({
  selector: 'app-create-doctor',
  imports: [FormsModule],
  templateUrl: './create-doctor.html',
  styleUrl: './create-doctor.css',
})
export class CreateDoctor {

  public userId: string = '';
  public specialization: string = '';
  public clinicName: string = '';
  public clinicAddress: string = '';
  public clinicPhoneNumber: string = '';
  public clinicEmail: string = '';

  public isLoading = signal<boolean>(false);

  // Users offered in the "User" dropdown (loaded from Account/GetUsers).
  public users = signal<User[]>([]);

  constructor(private callapi: Callapi,
    private verfication: VerfivationToken,
    private router: Router,
    private swal: SwalAlert) {
  }

  ngOnInit(): void {
    if (!this.verfication.islogin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.GetUsers();
  }

  public GetUsers(): void {
    const sub = this.callapi.ListUser().subscribe({
      next: (res: UserResponse) => {
        if (res.success) {
          this.users.set(res.data);
        }
        else {
          this.swal.showWoringSave(res.message);
        }
        sub.unsubscribe();
      },
      error: (err) => {
        this.swal.showWoringSave(err.error?.message || 'Could not load the users.');
        sub.unsubscribe();
      }
    });
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const doctor: createDoctors = {
      userId: this.userId.trim(),
      specialization: this.specialization.trim(),
      clinicName: this.clinicName.trim(),
      clinicAddress: this.clinicAddress.trim(),
      clinicPhoneNumber: this.clinicPhoneNumber.trim(),
      clinicEmail: this.clinicEmail.trim()
    };

    this.isLoading.set(true);

    const sub = this.callapi.createDoctor(doctor).subscribe({
      next: (res) => {
        sub.unsubscribe();
        this.isLoading.set(false);
        if (res.success) {
          this.swal.showSuccess();
          // Explicit empty values: a bare resetForm() would set the bound fields to null.
          form.resetForm({
            userId: '',
            specialization: '',
            clinicName: '',
            clinicAddress: '',
            clinicPhoneNumber: '',
            clinicEmail: ''
          });
        }
        else {
          this.swal.showWoringSave(res.message);
        }
      },
      error: (err) => {
        sub.unsubscribe();
        this.isLoading.set(false);
        this.swal.showWoringSave(err.error?.message || 'Could not create the doctor.');
      }
    });
  }

}

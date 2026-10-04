import { Component, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Callapi } from '../../../../../services/callapi/callapi';
import { SwalAlert } from '../../../../../services/swalAlert/swal-alert';
import { UserDto } from '../../../../../interfaces/user-dto';
import { ListRoleesponse, RoleDto } from '../../../../../interfaces/role-dto';
import { UserList } from '../user-list/user-list';

@Component({
  selector: 'app-adduser',
  imports: [FormsModule, UserList],
  templateUrl: './adduser.html',
  styleUrl: './adduser.css',
})
export class Adduser {

  readonly userList = viewChild.required(UserList);

  public firstName: string = '';
  public lastName: string = '';
  public jobTitle: string = '';
  public userName: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  public isLoading = signal<boolean>(false);

  // Roles offered as checkboxes (loaded from Account/GetRoles) and the ones ticked.
  public roles = signal<RoleDto[]>([]);
  public selectedRoles = signal<string[]>([]);
  public rolesTouched = signal<boolean>(false);

  private readonly defaultRole = 'BaseUser';

  constructor(private callapi: Callapi,
    private swal: SwalAlert) {
  }

  ngOnInit(): void {
    this.GetRoles();
  }

  public GetRoles(): void {
    const sub = this.callapi.GetListRole().subscribe({
      next: (res: ListRoleesponse) => {
        if (res.success) {
          this.roles.set(res.data);
          this.resetRoles();
        }
        else {
          this.swal.showWoringSave(res.message);
        }
        sub.unsubscribe();
      },
      error: (err) => {
        this.swal.showWoringSave(err.error?.message || 'Could not load the roles.');
        sub.unsubscribe();
      }
    });
  }

  public toggleRole(roleName: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.rolesTouched.set(true);
    this.selectedRoles.update(current =>
      checked
        ? (current.includes(roleName) ? current : [...current, roleName])
        : current.filter(r => r !== roleName));
  }

  // Back to the default selection (BaseUser, when that role exists).
  private resetRoles(): void {
    this.rolesTouched.set(false);
    this.selectedRoles.set(this.roles().some(r => r.name === this.defaultRole) ? [this.defaultRole] : []);
  }

  public onSubmit(form: NgForm): void {
    this.rolesTouched.set(true);
    if (form.invalid || this.password !== this.confirmPassword || this.selectedRoles().length === 0) {
      form.control.markAllAsTouched();
      return;
    }

    const user: UserDto = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      jobTitle: this.jobTitle.trim(),
      userName: this.userName.trim(),
      email: this.email.trim(),
      password: this.password,
      roles: this.selectedRoles()
    };

    this.isLoading.set(true);

    // The register endpoint also returns a token for the NEW user — it is
    // deliberately ignored here so the admin's own session is not replaced.
    const sub = this.callapi.CreateUser(user).subscribe({
      next: (res) => {
        sub.unsubscribe();
        this.isLoading.set(false);
        if (res.success) {
          this.swal.showSuccess();
          form.resetForm();
          this.resetRoles();
          this.userList().GetAllUsers();
        }
        else {
          this.swal.showWoringSave(this.errorText(res.message, res.errors));
        }
      },
      error: (err) => {
        sub.unsubscribe();
        this.isLoading.set(false);
        this.swal.showWoringSave(this.errorText(err.error?.message, err.error?.errors));
      }
    });
  }

  private errorText(message?: string, errors?: Record<string, any> | null): string {
    const details = errors ? (Object.values(errors) as unknown[]).flat().join('\n') : '';
    return [message, details].filter(Boolean).join('\n') || 'Could not create the user.';
  }

}

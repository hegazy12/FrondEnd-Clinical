import { Component, viewChild } from '@angular/core';
import { Callapi } from '../../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../../services/swalAlert/swal-alert';
import { User, UserResponse } from '../../../../../interfaces/user-dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'email', 'jobTitle'];

  dataSource = new MatTableDataSource<User>([]);

  readonly sort = viewChild.required(MatSort);
  readonly paginator = viewChild.required(MatPaginator);

  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) { }

  ngOnInit(): void {
    if (this.Verfication.islogin()) {
      this.GetAllUsers();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public GetAllUsers() {
    const sub = this.callapi.ListUser().subscribe({
      next: (res: UserResponse) => {
        if (res.success) {
          this.dataSource.data = res.data;
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

}

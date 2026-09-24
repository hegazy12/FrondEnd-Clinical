import { Component, signal, viewChild } from '@angular/core';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { ExaminationFindingDTO1, ExaminationFindingListResponse } from '../../../../interfaces/examination-finding';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-list-examination-finding',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule],
  templateUrl: './list-examination-finding.html',
  styleUrl: './list-examination-finding.css',
})
export class ListExaminationFinding {

  displayedColumns: string[] = ['name', 'description', 'actions'];

  data = signal<ExaminationFindingDTO1[]>([]);
  dataSource = new MatTableDataSource<ExaminationFindingDTO1>([]);

  readonly sort = viewChild.required(MatSort);
  readonly paginator = viewChild.required(MatPaginator);


  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) { }


  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
      this.GetAllExaminationFinding();
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

  public GetAllExaminationFinding() {
    let Sup = this.callapi.GetAllExaminationFinding().subscribe({
      next: (P: ExaminationFindingListResponse) => {
        this.data.set(P.data);
        this.dataSource.data = P.data;
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
  }

  public DeleteExaminationFinding(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let sup = this.callapi.DeleteExaminationFinding(id).subscribe({
          next: (P: any) => {
            if (P.success == true) {
              Swal.fire({
                title: "Deleted!",
                text: "The examination finding has been deleted.",
                icon: "success"
              });
            }
            this.GetAllExaminationFinding();
            sup.unsubscribe();
          },
          error: (err) => {
            this.swal.showWoringSave("you can't delete this item");
            this.GetAllExaminationFinding();
            sup.unsubscribe();
          }
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel)
        Swal.fire({
          title: "Cancelled",
          text: "The examination finding is safe :)",
          icon: "error"
        });
    });
  }

}

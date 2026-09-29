import { Component, signal, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { ListServiceResponse, ServiceDTO1 } from '../../../../interfaces/service-dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-service',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, DecimalPipe],
  templateUrl: './list-service.html',
  styleUrl: './list-service.css',
})
export class ListService {

  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];

  data = signal<ServiceDTO1[]>([]);
  dataSource = new MatTableDataSource<ServiceDTO1>([]);

  readonly sort = viewChild.required(MatSort);
  readonly paginator = viewChild.required(MatPaginator);


  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) { }


  ngOnInit(): void {
    if (this.Verfication.islogin() == false) {

    }
    else {
      this.GetAllService();
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

  public GetAllService() {
    let Sup = this.callapi.SearchService().subscribe({
      next: (P: ListServiceResponse) => {
        this.data.set(P.data);
        this.dataSource.data = P.data;
        Sup.unsubscribe();
      },
      error: (err) => {
        Sup.unsubscribe();
      }
    });
  }

  public DeleteService(id: string) {
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
        let sup = this.callapi.DeleteService(id).subscribe({
          next: (P: any) => {
            if (P.success == true) {
              Swal.fire({
                title: "Deleted!",
                text: "The service has been deleted.",
                icon: "success"
              });
            }
            this.GetAllService();
            sup.unsubscribe();
          },
          error: (err) => {
            this.swal.showWoringSave(err.error?.message);
            this.GetAllService();
            sup.unsubscribe();
          }
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel)
        Swal.fire({
          title: "Cancelled",
          text: "The service is safe :)",
          icon: "error"
        });
    });
  }

}

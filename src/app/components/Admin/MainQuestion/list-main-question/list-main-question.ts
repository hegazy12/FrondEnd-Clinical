import { Component, viewChild } from '@angular/core';
import { Callapi } from '../../../../services/callapi/callapi';
import { VerfivationToken } from '../../../../services/verfivationToken/verfivation-token';
import { SwalAlert } from '../../../../services/swalAlert/swal-alert';
import { ListMainQuestionResponse, MainQuestionDTO1 } from '../../../../interfaces/main-question-dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-main-question',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule],
  templateUrl: './list-main-question.html',
  styleUrl: './list-main-question.css',
})
export class ListMainQuestion {

  displayedColumns: string[] = ['questionBody', 'description', 'dataTypeName', 'values', 'actions'];

  dataSource = new MatTableDataSource<MainQuestionDTO1>([]);

  readonly sort = viewChild.required(MatSort);
  readonly paginator = viewChild.required(MatPaginator);

  constructor(private callapi: Callapi,
    private Verfication: VerfivationToken,
    private swal: SwalAlert) {
  }

  ngOnInit(): void {
    // "Values" is a computed column (list items or min - max), so it needs its own sort key.
    this.dataSource.sortingDataAccessor = (item, property) =>
      property === 'values'
        ? this.valuesText(item)
        : (item as unknown as Record<string, string | number>)[property];

    if (this.Verfication.islogin()) {
      this.getdata();
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

  // What the "Values" column shows: the dropdown items, or the numeric range.
  public valuesText(item: MainQuestionDTO1): string {
    if (item.listValues?.length) {
      return item.listValues.join(', ');
    }
    if (item.minValue || item.maxValue) {
      return `${item.minValue} - ${item.maxValue}`;
    }
    return '';
  }

  getdata() {
    let sub = this.callapi.GetAllMainQuestion().subscribe({
      next: (P: ListMainQuestionResponse) => {
        this.dataSource.data = P.data;
        sub.unsubscribe();
      },
      error: (err) => {
        sub.unsubscribe();
      }
    })
  }

  public deleteMainQuestion(id: string) {
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
        let sub = this.callapi.DeleteMainQuestion(id).subscribe({
          next: (P: any) => {
            if (P.success == true) {
              Swal.fire({
                title: "Deleted!",
                text: "The question has been deleted.",
                icon: "success"
              });
            }
            this.getdata();
            sub.unsubscribe();
          },
          error: (err) => {
            this.swal.showWoringSave(err.error?.message)
            this.getdata();
            sub.unsubscribe();
          }
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel)
        Swal.fire({
          title: "Cancelled",
          text: "The question is safe :)",
          icon: "error"
        });
    });
  }

}

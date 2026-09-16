import { Component } from '@angular/core';
import { SwalAlert } from '../../../../../services/swalAlert/swal-alert';
import { VerfivationToken } from '../../../../../services/verfivationToken/verfivation-token';
import {Callapi} from '../../../../../services/callapi/callapi';

@Component({
  selector: 'app-doctor-list',
  imports: [],
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList {



      constructor(private Callapi : Callapi,
                  private Verfication :VerfivationToken,
                  private swal: SwalAlert)
                  {
                  }
      

}

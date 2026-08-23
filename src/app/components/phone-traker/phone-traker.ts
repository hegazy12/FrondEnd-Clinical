import { Component, inject, signal, Renderer2 } from '@angular/core';
import { SwalAlert } from '../../services/swalAlert/swal-alert';
import { Callapi } from '../../services/callapi/callapi';
import { VerfivationToken } from '../../services/verfivationToken/verfivation-token';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phone-traker',
  imports: [],
  templateUrl: './phone-traker.html',
  styleUrl: './phone-traker.css',
})
export class PhoneTraker {
  private callApi = inject(Callapi);
  private verification = inject(VerfivationToken);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private swal = inject(SwalAlert);
  private renderer = inject(Renderer2);

  public doctorId = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');
  
}

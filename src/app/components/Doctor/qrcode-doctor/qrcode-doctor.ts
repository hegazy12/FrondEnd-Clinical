import { Component, Input, signal } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken } from '../../../services/verfivationToken/verfivation-token';
import { Router } from '@angular/router';
import { LinkService } from '../../../services/linkService/link-service';
import { Navbar } from '../../navbar/navbar';


@Component({
  selector: 'app-qrcode-doctor',
  imports: [QRCodeComponent, Navbar],
  templateUrl: './qrcode-doctor.html',
  styleUrl: './qrcode-doctor.css',
})
export class QrcodeDoctor {
  public doctorId = signal<string | null>('');
  public frontLink = signal<string>('');

  constructor(private callapi: Callapi, private router: Router, private Vervication: VerfivationToken, private LinkService: LinkService) {
   
  }

  ngOnInit(): void {
  
        this.doctorId.set(this.Vervication.GetLoginID());
        this.frontLink.set(this.LinkService.gitFrontOrigin());
        this.frontLink.set(this.frontLink() + '/phonetraker/' + this.doctorId());
    
  }
}

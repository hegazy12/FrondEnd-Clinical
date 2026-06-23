import { Navbar } from '../navbar/navbar';
import { Component } from '@angular/core';
import { CreateDoctor } from '../Doctor/create-doctor/create-doctor';
import { MakePrescription } from '../Prescription/make-prescription/make-prescription';

@Component({
  selector: 'app-settings',
  imports: [Navbar,CreateDoctor,MakePrescription],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings{
  
}

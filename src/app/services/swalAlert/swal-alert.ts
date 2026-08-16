import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalAlert {
    
  
  
  
  showSuccess()
    {
      Swal.fire({
        title: 'Saved Successfully!',
        text: 'The patient record has been updated.',
        icon: 'success',
        confirmButtonText: 'Great',
        confirmButtonColor: '#0d6efd' // Bootstrap primary color
      });
    }

    showError(message: string)
    {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc3545' // Bootstrap danger color
      });
    }

    showWoringSave(message: string)
    {
     Swal.fire({
      title : "can't save change",
      text :message,
      icon:"warning",
      confirmButtonColor: '#dc3545', // Danger Red
      background: '#fff',
      customClass: {
        confirmButton: 'px-4 py-2'
      }

     })
    }

showLoginFailed(message: string ) {
    Swal.fire({
      title: 'Login Failed!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#dc3545', // Danger Red
      background: '#fff',
      customClass: {
        confirmButton: 'px-4 py-2'
      }
    });
  }
    
}

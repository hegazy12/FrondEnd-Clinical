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

    
}

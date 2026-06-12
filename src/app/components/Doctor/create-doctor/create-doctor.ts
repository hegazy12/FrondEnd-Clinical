import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Callapi } from '../../../services/callapi/callapi';
import { VerfivationToken} from '../../../services/verfivationToken/verfivation-token'
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-doctor',
  imports: [FormsModule],
  templateUrl: './create-doctor.html',
  styleUrl: './create-doctor.css',
})

export class CreateDoctor 
{
    constructor(private Callapi : Callapi ,private Verfication :VerfivationToken ,private router: Router){}
    
    ngOnInit():void{
        if(this.Verfication.islogin() == false)
        {
            this.router.navigate(['/Login']);
        }
        else
        {  
        }
    }    
}
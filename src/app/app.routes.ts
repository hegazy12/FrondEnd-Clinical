import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Mainpage } from './components/mainpage/mainpage';
import {CreatePatient} from './components/Patient/create-patient/create-patient';
import {Patientview} from './components/Patient/patientview/patientview'
import {Settings} from './components/settings/settings'
import { Mypatient } from './components/Doctor/mypatient/mypatient';
import { Patientappointment } from './components/Doctor/patientappointment/patientappointment';

export const routes: Routes = [
    {
        path:"",
        component: Login
    },
    {
        path:"Login",
        component: Login
    },{
        path:"Mainpage",
        component: Mainpage
    },{
        path :"CreatePatient",
        component :CreatePatient
    },{
        path:"Patient/GetPatient/:id",
        component:Patientview
    },{
        path:"Sitting",
        component: Settings
    },
    {
        path: 'Mypatient',
        component: Mypatient
    },
    {
        path: 'Patientappointment/:id',
        component: Patientappointment
    }
];
        
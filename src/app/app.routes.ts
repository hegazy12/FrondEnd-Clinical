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
        path:"login",
        component: Login
    },{
        path:"mainpage",
        component: Mainpage
    },{
        path :"createpatient",
        component :CreatePatient
    },{
        path:"patient/getpatient/:id",
        component:Patientview
    },{
        path:"sitting",
        component: Settings
    },
    {
        path: 'mypatient',
        component: Mypatient
    },
    {
        path: 'patientappointment/:id',
        component: Patientappointment
    }
];
        
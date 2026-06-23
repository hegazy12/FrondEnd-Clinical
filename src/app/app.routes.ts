import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Mainpage } from './components/mainpage/mainpage';
import {CreatePatient} from './components/Patient/create-patient/create-patient';
import {Patientview} from './components/Patient/patientview/patientview'
import {Settings} from './components/settings/settings'

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
        path:"Patientview/:id",
        component:Patientview
    },{
        path:"Sitting",
        component: Settings
    }
];
        
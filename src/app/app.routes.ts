import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Mainpage } from './components/mainpage/mainpage';
import { CreatePatient } from './components/Patient/create-patient/create-patient';
import { Patientview } from './components/Patient/patientview/patientview'
import { Settings } from './components/settings/settings'
import { Mypatient } from './components/Doctor/mypatient/mypatient';
import { Patientappointment } from './components/Doctor/patientappointment/patientappointment';
import { PhoneTraker } from './components/phone-traker/phone-traker';
import { AdminView } from './components/Admin/admin-view/admin-view';
import { DoctorView } from './components/Doctor/doctor-view/doctor-view';
import { AllPatientview } from './components/Patient/all-patientview/all-patientview';

export const routes: Routes = [
    {
        path: "",
        component: Login
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "mainpage",
        component: Mainpage
    },
    {
        path: "createpatient",
        component: CreatePatient
    },
    {
        path: "allpatientview",
        component: AllPatientview
    },
    {
        path: "patient/getpatient/:id",
        component: Patientview
    },
    {
        path: "sitting",
        component: Settings
    },
    {
        path: 'mypatient',
        component: Mypatient
    },
    {
        path: 'patientappointment/:id',
        component: Patientappointment
    },
    {
        path: 'phonetraker/:id',
        component: PhoneTraker
    },
    {
        path: 'Admin',
        component: AdminView
    },
    {
        path: 'Settings',
        component: Settings
    },
    {
        path: 'DoctorView',
        component: DoctorView
    }
];

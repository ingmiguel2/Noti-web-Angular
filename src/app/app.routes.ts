import { Routes } from '@angular/router';

import { Register } from './components/register/register';
import { Homei } from './components/homei/homei';
import { Login } from './components/authentication/login/login';
import { Animal } from './components/base/animal/animal';
import { User } from './components/base/users/users';
import { Logout } from './components/authentication/logout/logout';
import { Noticia } from './components/base/noticia/noticia'; // ← SOLO ESTA LÍNEA
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { EditorDashboard } from './components/editor-dashboard/editor-dashboard';
import { LectorDashboard } from './components/lector-dashboard/lector-dashboard';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: '', component: Homei, pathMatch: 'full'},
    {path: 'animal', component: Animal},
    {path: 'user', component: User},
    {path: 'logout', component: Logout},
    {path: 'noticia', component: Noticia},
    {path: 'admin', component: AdminDashboard},
    {path: 'editor', component: EditorDashboard},
    {path: 'lector', component: LectorDashboard}
];
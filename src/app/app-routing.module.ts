import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, // Página principal
    children: [
      {
        path: 'alumno-list',
        loadChildren: () =>
          import('./alumno/alumno-list/alumno-list.module').then(
            (m) => m.AlumnoListPageModule
          ),
      },
      {
        path: 'alumno-edit/:id',  // Corregido
        loadChildren: () =>
          import('./alumno/alumno-edit/alumno-edit.module').then(
            (m) => m.AlumnoEditPageModule
          ),
      },
      {
        path: 'alumno-edit',  // Mantén esta ruta si es necesario
        loadChildren: () =>
          import('./alumno/alumno-edit/alumno-edit.module').then(
            (m) => m.AlumnoEditPageModule
          ),
      },
      // Haz lo mismo para las rutas de profesores
      {
        path: 'profesor-list',
        loadChildren: () =>
          import('./profesor/profesor-list/profesor-list.module').then(
            (m) => m.ProfesorListPageModule
          ),
      },
      {
        path: 'profesor-edit/:id',  // Corregido
        loadChildren: () =>
          import('./profesor/profesor-edit/profesor-edit.module').then(
            (m) => m.ProfesorEditPageModule
          ),
      },
      {
        path: 'profesor-edit',  // Mantén esta ruta si es necesario
        loadChildren: () =>
          import('./profesor/profesor-edit/profesor-edit.module').then(
            (m) => m.ProfesorEditPageModule
          ),
      },
      {
        path: 'materia-list',
        loadChildren: () =>
          import('./materia/materia-list/materia-list.module').then(
            (m) => m.MateriaListPageModule
          ),
      },
      {
        path: 'materia-edit/:id',
        loadChildren: () =>
          import('./materia/materia-edit/materia-edit.module').then(
            (m) => m.MateriaEditPageModule
          ),
      },
      {
        path: 'materia-edit',
        loadChildren: () =>
          import('./materia/materia-edit/materia-edit.module').then(
            (m) => m.MateriaEditPageModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full', // Redirige a la página principal si no hay otra ruta.
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

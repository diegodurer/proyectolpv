import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoEditPage } from './alumno-edit.page';

const routes: Routes = [
  {
    path: '', // Ruta vacía, ya que el módulo se carga en su propia página
    component: AlumnoEditPage, // Usamos el componente directamente
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoEditPageRoutingModule {}

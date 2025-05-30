import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriaEditPage } from './materia-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MateriaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriaEditPageRoutingModule {}

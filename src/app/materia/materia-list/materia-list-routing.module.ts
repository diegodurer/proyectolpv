import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriaListPage } from './materia-list.page';

const routes: Routes = [
  {
    path: '',
    component: MateriaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriaListPageRoutingModule {}

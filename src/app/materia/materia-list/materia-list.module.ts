import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriaListPageRoutingModule } from './materia-list-routing.module';

import { MateriaListPage } from './materia-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriaListPageRoutingModule
  ],
  declarations: [MateriaListPage]
})
export class MateriaListPageModule {}

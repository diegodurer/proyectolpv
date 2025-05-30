import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MateriaEditPageRoutingModule } from './materia-edit-routing.module';
import { MateriaEditPage } from './materia-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <-- Importar esto
    IonicModule,
    MateriaEditPageRoutingModule
  ],
  declarations: [MateriaEditPage]
})
export class MateriaEditPageModule {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models/materia.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.page.html',
  styleUrls: ['./materia-list.page.scss'],
})
export class MateriaListPage implements OnInit, OnDestroy {
  listaMaterias: Materia[] = [];
  query = '';
  private materiaSubscription!: Subscription;

  constructor(
    private materiaService: MateriaService,
    private rt: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  ngOnDestroy() {
    if (this.materiaSubscription) {
      this.materiaSubscription.unsubscribe();
    }
  }

  async cargarMaterias() {
    this.listaMaterias = await this.materiaService.getMaterias();
  }

  nuevo() {
    this.rt.navigate(['/home/materia-edit']);
  }

  editarMateria(id: string) {
    this.rt.navigate(['/home/materia-edit', id]);
  }

  async eliminarMateriaConfirmacion(id: string) {
    if (!id) {
      console.error('El ID de la materia es inválido o no existe.');
      return;
    }
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de eliminar esta materia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminarMateria(id)
        }
      ]
    });
    await alert.present();
    this.cargarMaterias();
  }

  async eliminarMateria(id: string) {
    try {
      await this.materiaService.deleteMateria(id);
    } catch (error) {
      console.error('Error al eliminar materia', error);
    }
  }
}

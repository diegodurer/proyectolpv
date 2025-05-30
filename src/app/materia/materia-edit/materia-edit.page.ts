import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaService } from '../../services/materia.service';
import { ProfesorService } from '../../services/profesor.service';
import { Materia } from '../../models/materia.model';

@Component({
  selector: 'app-materia-edit',
  templateUrl: './materia-edit.page.html',
  styleUrls: ['./materia-edit.page.scss'],
})
export class MateriaEditPage implements OnInit {
  materiaForm: FormGroup;
  esEdicion = false;
  materiaId: string | null = null;

  // Opciones para semestre y carrera
  semestres = [
    '1er Semestre', '2do Semestre', '3er Semestre', 
    '4to Semestre', '5to Semestre', '6to Semestre'
  ];

  carreras = [
    'Ingeniería en Sistemas', 
    'Ingeniería Electrónica', 
    'Ingeniería Industrial',
    'Licenciatura en Computación'
  ];
  profesores: any[] = []; // Lista de profesores
  profesorSeleccionado: string | null = null; 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private materiaService: MateriaService,
    private profesorService: ProfesorService 
  ) {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
      semestre: ['', Validators.required],
      carrera: ['', Validators.required],
      profesor: ['', Validators.required]
    });
    this.cargarProfesores();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.materiaId = id;
        this.esEdicion = true;
        this.cargarMateria(id);
      }
    });
  }

  async cargarMateria(id: string) {
    try {
      const materia = await this.materiaService.getMateriaById(id);
      if (materia) {
        this.materiaForm.patchValue(materia);
      }
    } catch (error) {
      console.error('Error al cargar materia', error);
    }
  }

  async guardar() {
    if (this.materiaForm.valid) {
      try {
        const materiaData = this.materiaForm.value;
        materiaData.profesor = this.profesorSeleccionado;
        if (this.esEdicion && this.materiaId) {
          await this.materiaService.updateMateria(this.materiaId, materiaData);
        } else {
          await this.materiaService.createMateria(materiaData);
        }
        
        this.router.navigate(['/home/materia-list']);
      } catch (error) {
        console.error('Error al guardar materia', error);
      }
    }
  }

  cargarProfesores() {
    this.profesorService.getProfesores().subscribe(
      (profesores) => {
        console.log(profesores);
        this.profesores = profesores;
      },
      (error) => {
        console.error('Error al cargar profesores', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/home/materia-list']);
  }
}
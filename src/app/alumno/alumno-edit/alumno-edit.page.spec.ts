import { TestBed } from '@angular/core/testing';
import { AlumnoEditPage } from './alumno-edit.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/storage';

describe('AlumnoEditPage', () => {
  let component: AlumnoEditPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(yourFirebaseConfig),
        AngularFireStorage,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { id: '123' } } },
        Router,
        Firestore,
      ],
    });

    const fixture = TestBed.createComponent(AlumnoEditPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Aquí podrías agregar más pruebas relacionadas con las interacciones con Firestore y Storage
});

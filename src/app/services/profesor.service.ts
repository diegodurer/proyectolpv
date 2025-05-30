import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private firestore: AngularFirestore) { }

  // Método para obtener todos los profesores
  getProfesores() {
    return this.firestore.collection('profesores').get().pipe(
      map(snapshot => {
        if (!snapshot) {
          throw new Error('No se encontraron datos');
        }

        return snapshot.docs.map(doc => {
          const data = doc.data();
          if (data && typeof data === 'object') {
            return { id: doc.id, ...data };
          } else {
            console.error('Datos inválidos en el documento', doc.id);
            return { id: doc.id, nombre: 'Desconocido' };
          }
        });
      })
    );
  }
}
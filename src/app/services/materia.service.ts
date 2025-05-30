import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, limit, getDocs, where, getDoc } from '@angular/fire/firestore';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  constructor(private firestore: Firestore) {}

  // Obtener lista de materias
  async getMaterias(lastVisible: any = null, queryText: string = '', resultLimit: number = 20) {
    const materiasRef = collection(this.firestore, 'materia');
    let q = query(materiasRef, limit(resultLimit));

    if (queryText) {
      q = query(
        materiasRef,
        where("nombre", ">=", queryText.toUpperCase()),
        where("nombre", "<=", queryText.toLowerCase() + '\uf8ff'),
        limit(resultLimit)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Materia));
  }

  // Crear materia
  async createMateria(materia: Materia) {
    const materiasRef = collection(this.firestore, 'materia');
    return await addDoc(materiasRef, materia);
  }

  // Actualizar materia
  async updateMateria(id: string, materia: Partial<Materia>) {
    const materiaDocRef = doc(this.firestore, 'materia', id);
    return await updateDoc(materiaDocRef, materia);
  }

  // Eliminar materia
  async deleteMateria(id: string) {
    const materiaDocRef = doc(this.firestore, 'materia', id);
    return await deleteDoc(materiaDocRef);
  }

  // Obtener materia por ID
  async getMateriaById(id: string) {
    const materiaDocRef = doc(this.firestore, 'materia', id);
    const docSnap = await getDoc(materiaDocRef);
    return docSnap.exists() ? 
      { id: docSnap.id, ...docSnap.data() } as Materia : null;
  }
}

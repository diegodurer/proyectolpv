import { Component, OnInit } from '@angular/core';
import { collection, Firestore, doc, deleteDoc, query, limit, getDocs, startAfter, orderBy, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.page.html',
  styleUrls: ['./alumno-list.page.scss'],
})
export class AlumnoListPage implements OnInit {
  listaAlumnos: any[] = [];
  li = 20;
  stAt: any;
  hayMasDatos: boolean = true;  // Nuevo indicador
  lastVisible: any;
  isSearch: boolean = false;
  query = "";

  constructor(
    private readonly firestore: Firestore, 
    private rt: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.iniciar();
  }
  ionViewWillEnter() {
    this.iniciar();
  }

  iniciar() {
    console.log("ion will enter");
    this.listaAlumnos=new Array();
    this.lastVisible=null;
    this.listarAlumnos();
  }



  listarAlumnosSinFiltro = () => {
    const alumnosRef = collection(this.firestore, 'alumno');

    let q = undefined;
    if (this.lastVisible) {
      q = query(alumnosRef, limit(this.li), startAfter(this.lastVisible));
    } else {
      q = query(alumnosRef, limit(this.li));
    }
    const querySnapshot = getDocs(q).then(re => {
      if (!re.empty) {
        this.lastVisible = re.docs[re.docs.length - 1];

        re.forEach(doc => {
          //console.log("queryyyy", doc.id, "data", doc.data());
          let alumno: any = doc.data();
          alumno.id = doc.id;
          this.listaAlumnos.push(alumno);
        });
      }
    });


  }

  listarAlumnos = () => {
    const alumnosRef = collection(this.firestore, 'alumno');

    if ((this.query + "").length > 0) {
      let q = undefined;
      if (this.lastVisible) {
        q = query(alumnosRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible));

      } else {
        q = query(alumnosRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li));
      }
      getDocs(q).then(re => {

        if (!re.empty) {
          let nuevoArray = new Array();
          //retirar lo que no corresonde
          for (let i = 0; i < re.docs.length; i++) {
            const doc: any = re.docs[i].data();
            if (doc.nombre.toUpperCase().
              startsWith(
                this.query.toUpperCase().charAt(0)//M
              )) {
              nuevoArray.push(re.docs[i]);

            }
          }
          this.lastVisible = re.docs[nuevoArray.length - 1];
          for (let i = 0; i < nuevoArray.length; i++) {
            const doc: any = nuevoArray[i];
            let alumno: any = doc.data();
            alumno.id = doc.id;
            this.listaAlumnos.push(alumno);
          }

        }
      });
    } else {
      this.listarAlumnosSinFiltro();
    }
  }


  clearSearch = () => {
    this.isSearch = false;
    this.query = "";

    this.listaAlumnos = new Array();
    this.lastVisible = null;
    this.listarAlumnos();
  }


  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaAlumnos = new Array();
    this.lastVisible = null;
    this.listarAlumnos();
  }

  nuevo = () => {
    this.rt.navigate(['/home/alumno-edit']);
  }

  async eliminarExamenConfirmacion(id: string) {
    // Se muestra una confirmación antes de eliminar
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres eliminar este alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarAlumno(id);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarAlumno = async (id: string) => {
    try {
      const documentRef = doc(this.firestore, 'alumno', id);
      await deleteDoc(documentRef);
      console.log('Alumno eliminado');
      this.iniciar();
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
    }
  }
  clickSearch = () => {
    this.isSearch = true;
  }


  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    if (this.hayMasDatos) {
      this.listarAlumnos();
    }
    setTimeout(() => {
      ev.target.complete();
      if (!this.hayMasDatos) {
        ev.target.disabled = true;  // Deshabilitamos el ion-infinite-scroll si no hay más datos
      }
    }, 500);
  }


}

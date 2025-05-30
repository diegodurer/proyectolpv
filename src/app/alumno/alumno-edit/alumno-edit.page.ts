import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Storage, StorageError, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.page.html',
  styleUrls: ['./alumno-edit.page.scss'],
})
export class AlumnoEditPage implements OnInit {


 
  id: any;

  alumno: any = [];
  avatar: string = '';
  //private storage: Storage = inject(Storage);
  constructor(private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private rt: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log('Parámetros recibidos:', params);
  
      if (params.id) {
        this.id = params.id;
        this.obtenerAlumno(this.id); // Editar un alumno existente
      } else {
        console.log("Creando un nuevo alumno");
        this.alumno = {}; // Inicializa un nuevo alumno vacío
      }
    });
  }

  incluirAlumno = () => {
    console.log('aqui incluir en firebase');
    let alumnoRef = collection(this.firestore, 'alumno');
  
    addDoc(alumnoRef, {
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido
    })
      .then((docRef) => {
        console.log('Registro incluido con ID:', docRef.id);
        this.id = docRef.id; // Guarda el ID del nuevo documento
        // Si ya se seleccionó una imagen, súbela
        console.log("El id: ", docRef.id);
        const inputElement = document.querySelector<HTMLInputElement>('#avatarInput'); // ID del input de imagen
        if (inputElement && inputElement.files?.length) {
          console.log("inputElement: ", inputElement);
          this.uploadFile(inputElement);
        }
        this.volver();
      })
      .catch((error) => {
        console.error('Error al incluir registro:', error);
      });
  };

  editarAlumno = (id: string) => {
    console.log('aqui editar en firebase');
    const document = doc(this.firestore, 'alumno', this.id);

    updateDoc(
      document,
      {
        codigo: this.alumno.codigo,
        nombre: this.alumno.nombre,
        apellido: this.alumno.apellido
      }

    ).then(doc => {
      console.log('registro editado');
      this.volver();

    }
    ).catch((error) => {
      console.error("Error: ", error);
    });
  }

  obtenerAlumno = (id: string) => {

    const document = doc(this.firestore, 'alumno', id);

    getDoc(document).then(doc => {
      console.log('registro a editar', doc.data());
      if (doc.data()) {
        console.log("Entre aca");
        this.alumno = doc.data();
        if (this.alumno.avatar) {
          this.obtenerAvatarAlumno();
        }
      } else {
        this.alumno = {};
      }


    });
  }

  volver = () => {
    this.rt.navigate(['/home/alumno-list']);


  }

  accion = (id: string) => {
    if (this.id) {
      //console.log("modificar");
      this.editarAlumno(this.id);

    } else {
      //console.log("guardar");
      this.incluirAlumno();

    }
    this.volver();
  }
  uploadFile = (input: HTMLInputElement) => {
    if (!input.files || !this.alumno.codigo) {
      console.error('Error: Archivo o ID no están definidos.');
      return;
    }
  
    const files: FileList = input.files;
  
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, `avatars/alumno/${this.alumno.codigo}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(  'state_changed',
          this.onUploadChange,
          this.onUploadError,
          async () => {
            console.log('Upload completo');
            const avatarPath = `avatars/alumno/${this.alumno.codigo}`;
  
            if (this.id) {
              // Si el alumno ya existe, actualiza el campo 'avatar'
              this.editarAvatar();
              this.obtenerAvatarAlumno();
            } else {
              // Si el alumno no existe, crea el documento con el campo 'avatar'
              try {
                const alumnoRef = doc(collection(this.firestore, 'alumno')); // Genera un nuevo documento
                await setDoc(alumnoRef, {
                  codigo: this.alumno.codigo,
                  nombre: this.alumno.nombre || '', // Otros campos necesarios
                  apellido: this.alumno.apellido || '',
                  avatar: 'avatars/alumno/' + this.alumno.codigo
                });
                console.log("Nuevo alumno creado con avatar:", avatarPath);
                this.id = alumnoRef.id; // Guarda el nuevo ID generado
              } catch (error) {
                console.error("Error al crear el alumno con avatar:", error);
              }
            }
          }
        );
      }
    }
  };

  onUploadChange = (response: UploadTaskSnapshot) => {
    console.log('onUploadChange', response);
  }

  onUploadError = (error: StorageError) => {
    console.log('onUploadError', error);
  }

  onUploadComplete = () => {
    console.log('upload completo');
    this.editarAvatar();
    this.obtenerAvatarAlumno();
  }

  editarAvatar = () => {
    if (!this.id) {
      console.error("Error: ID no está definido.");
      return;
    }
    const document = doc(this.firestore, "alumno", this.id);
    updateDoc(document, {
      avatar: 'avatars/alumno/' + this.alumno.codigo
    }).then(doc => {
      console.log("Avatar Editado");
    }).catch(error => {
      console.error("Error actualizando avatar:", error);
    });
  }

  obtenerAvatarAlumno = () => {
    console.log("Entre en 'obtenerAvatarAlumno'");
    const storageRef = ref(this.storage, `avatars/alumno/${this.alumno.codigo}`);
    getDownloadURL(storageRef).then(doc => {
      this.avatar = doc;
    });
  }








}

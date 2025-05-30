import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}
  public appPages = [
    { title: 'Alumnos', url: 'alumno-list', icon: 'person' },
    { title: 'Profesores', url: 'profesor-list', icon: 'person' },
    { title: 'Materias', url: 'materia-list', icon: 'book' },
  ];

  logOut = () => {
    signOut(this.auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
    });
  }
}

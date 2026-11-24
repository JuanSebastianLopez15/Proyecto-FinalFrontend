import { Routes } from '@angular/router';
import { Menu } from './paginas/menu/menu';
import { Reservar } from './paginas/reservar/reservar';
import { Domicilio } from './paginas/domicilio/domicilio';
import { Ubicacion } from './paginas/ubicacion/ubicacion';
import { Contacto } from './paginas/contacto/contacto';
import { Nosotros } from './paginas/nosotros/nosotros';
import { Terminos } from './paginas/terminos/terminos';
import { Registro } from './paginas/registro/registro';
import { Login } from './paginas/login/login';
import { NoEncontrado } from './paginas/no-encontrado/no-encontrado';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'reservar', component: Reservar },
  { path: 'domicilio', component: Domicilio },
  { path: 'ubicacion', component: Ubicacion },
  { path: 'contacto', component: Contacto },
  { path: 'nosotros', component: Nosotros },
  { path: 'terminos', component: Terminos },
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
  { path: '**', component: NoEncontrado }
];
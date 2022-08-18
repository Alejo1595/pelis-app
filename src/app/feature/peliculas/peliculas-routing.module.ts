import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPeliculasComponent } from '@pelicula/components/listar-peliculas/listar-peliculas.component';
import { TabPeliculasComponent } from '@pelicula/components/tab-peliculas/tab-peliculas.component';
import { CarritoComponent } from '@pelicula/components/carrito/carrito.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full'
  },
  {
    path: 'formulario',
    component: TabPeliculasComponent
  },
  {
    path: 'listado',
    component: ListarPeliculasComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }

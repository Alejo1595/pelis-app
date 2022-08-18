import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: 'peliculas',
        pathMatch: 'full'
      },
      {
        path: 'peliculas',
        loadChildren: () => import('@pelicula/peliculas.module').then(m => m.PeliculasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    component: PageNotFoundComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: environment.production})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

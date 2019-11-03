import {Route} from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'user/',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// import { AuthGuard } from '@services/auth_guard.service';
// implement AuthGuad on all pages and implement lazy loading of components
const routes: Routes = [
    {
        path: '',
        loadChildren: '@pages/login/login.module#LoginModule',
    },
    {
        path: 'landing',
        loadChildren: '@pages/landing/landing.module#LandingModule',
    },
    {
        path: 'dynamic',
        loadChildren: '@pages/dynamic/dynamic.module#DynamicModule',
        //   canActivate: [CanActivateViaAuthGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutingModule { }

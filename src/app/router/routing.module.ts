import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';


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
        path: 'dashboard',
        loadChildren: '@pages/dashboard/dashboard.module#DashboardModule',
        //   canActivate: [CanActivateViaAuthGuard],
    },
    {
        path: 'reviews',
        loadChildren: '@pages/reviews/reviews.module#ReviewsModule',
        //   canActivate: [CanActivateViaAuthGuard],
    },
    {
        path: 'reports',
        loadChildren: '@pages/reports/reports.module#ReportsModule',
        //   canActivate: [CanActivateViaAuthGuard],
    },
    {
        path: 'admin',
        loadChildren: '@pages/admin/admin.module#AdminModule',
        //   canActivate: [CanActivateViaAuthGuard],
    },
    { path: 'whiteboard', component: WhiteboardComponent },
    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    // { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class RoutingModule { }

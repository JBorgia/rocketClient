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
        path: 'part-review',
        loadChildren: '@pages/part-review/part-review.module#PartReviewModule',
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
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutingModule { }

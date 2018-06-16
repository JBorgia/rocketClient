import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@pages/admin/admin.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { MissionStatusComponent } from '@pages/reports/mission-status/mission-status.component';
import { ReportsComponent } from '@pages/reports/reports.component';
import { ReviewStatusComponent } from '@pages/reports/review-status/review-status.component';
import { ReviewDetailsComponent } from '@pages/review-details/review-details.component';
import { ReviewsComponent } from '@pages/reviews/reviews.component';
import { TestComponent } from '@pages/test/test.component';
import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';


// import { AuthGuard } from '@services/auth_guard.service';
// implement AuthGuad on all pages and implement lazy loading of components
const routes: Routes = [
    {
        path: '',
        loadChildren: '@pages/login/login.module#LoginModule'
        //   canActivate: [CanActivateViaAuthGuard],
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'mission-status', component: MissionStatusComponent },
    { path: 'review-status', component: ReviewStatusComponent },
    { path: 'test', component: TestComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'whiteboard', component: WhiteboardComponent },
    { path: 'review-detail', component: ReviewDetailsComponent },
    {
        path: 'landing',
        loadChildren: '@pages/landing/landing.module#LandingModule'
    },
    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    // { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutingModule { }

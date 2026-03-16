import { Routes } from '@angular/router';
import { authGuard, workerGuard, employerGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'login', loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register.component').then(m => m.RegisterComponent) },
  { path: 'jobs', loadComponent: () => import('./components/jobs/job-list.component').then(m => m.JobListComponent) },
  { path: 'jobs/:id', loadComponent: () => import('./components/jobs/job-detail.component').then(m => m.JobDetailComponent) },
  { path: 'workers', loadComponent: () => import('./components/worker/worker-list.component').then(m => m.WorkerListComponent) },
  { path: 'profile/:id', loadComponent: () => import('./components/shared/profile.component').then(m => m.ProfileComponent) },
  {
    path: 'worker',
    canActivate: [workerGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./components/worker/worker-dashboard.component').then(m => m.WorkerDashboardComponent) },
      { path: 'applications', loadComponent: () => import('./components/worker/worker-applications.component').then(m => m.WorkerApplicationsComponent) },
      { path: 'profile', loadComponent: () => import('./components/worker/worker-profile.component').then(m => m.WorkerProfileComponent) },
    ]
  },
  {
    path: 'employer',
    canActivate: [employerGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./components/employer/employer-dashboard.component').then(m => m.EmployerDashboardComponent) },
      { path: 'post-job', loadComponent: () => import('./components/employer/post-job.component').then(m => m.PostJobComponent) },
      { path: 'jobs', loadComponent: () => import('./components/employer/employer-jobs.component').then(m => m.EmployerJobsComponent) },
      { path: 'applications/:jobId', loadComponent: () => import('./components/employer/job-applications.component').then(m => m.JobApplicationsComponent) },
      { path: 'profile', loadComponent: () => import('./components/employer/employer-profile.component').then(m => m.EmployerProfileComponent) },
    ]
  },
  { path: 'notifications', canActivate: [authGuard], loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent) },
  { path: '**', redirectTo: '' }
];

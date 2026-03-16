import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/services';
import { User } from '../../models/models';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss']
})
export class WorkerDashboardComponent implements OnInit {
  user: User | null = null;
  nearbyJobs: any[] = [];
  myApplications: any[] = [];
  loading = true;

  constructor(private auth: AuthService, private jobService: JobService, private appService: ApplicationService) {}

  ngOnInit() {
    this.user = this.auth.currentUser;
    this.jobService.getJobs({ barangay: this.user?.barangay, status: 'open', limit: 6 }).subscribe((res: any) => {
      this.nearbyJobs = res.jobs;
    });
    this.appService.getMyApplications().subscribe((res: any) => {
      this.myApplications = res.applications;
      this.loading = false;
    });
  }

  get pending() { return this.myApplications.filter(a => a.status === 'pending').length; }
  get accepted() { return this.myApplications.filter(a => a.status === 'accepted').length; }
  get completed() { return this.myApplications.filter(a => a.status === 'completed').length; }
  getStars(n: number) { return Array(5).fill(0).map((_,i) => i < Math.round(n) ? '★' : '☆').join(''); }
  getEmployerName(emp: any): string { return emp?.businessName || emp?.name || 'Unknown'; }
  getCategoryEmoji(v: string): string {
    const map: any = { construction:'🏗️', domestic:'🏠', agriculture:'🌾', electrical:'⚡', plumbing:'🔧', carpentry:'🪚', driving:'🚗', cooking:'🍳', laundry:'👕', delivery:'📦', gardening:'🌿', security:'🔐', other:'💼' };
    return map[v] || '💼';
  }
}

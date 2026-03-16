import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { ApplicationService, ToastService } from '../../services/services';
import { User } from '../../models/models';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.scss']
})
export class EmployerDashboardComponent implements OnInit {
  user: User | null = null;
  myJobs: any[] = [];
  loading = true;

  constructor(private auth: AuthService, private jobService: JobService, private toast: ToastService) {}

  ngOnInit() {
    this.user = this.auth.currentUser;
    this.jobService.getMyJobs().subscribe({
      next: (res: any) => { this.myJobs = res.jobs; this.loading = false; },
      error: () => this.loading = false
    });
  }

  get openJobs() { return this.myJobs.filter(j => j.status === 'open').length; }
  get totalApplicants() { return this.myJobs.reduce((sum, j) => sum + (j.applicants?.length || 0), 0); }
  get filledJobs() { return this.myJobs.filter(j => j.status === 'filled').length; }
}

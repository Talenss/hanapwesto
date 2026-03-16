import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ApplicationService, ToastService } from '../../services/services';
import { AuthService } from '../../services/auth.service';
import { Job } from '../../models/models';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: Job | null = null;
  loading = true;
  applying = false;
  showApplyModal = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private appService: ApplicationService,
    private toast: ToastService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.jobService.getJobById(id).subscribe({
      next: (res: any) => { this.job = res.job; this.loading = false; },
      error: () => { this.toast.error('Job not found'); this.router.navigate(['/jobs']); }
    });
  }

  apply() {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/login']); return; }
    this.applying = true;
    this.appService.apply(this.job!._id, this.message).subscribe({
      next: () => {
        this.toast.success('Application submitted!');
        this.showApplyModal = false;
        this.applying = false;
      },
      error: (err: any) => {
        this.toast.error(err.error?.message || 'Failed to apply');
        this.applying = false;
      }
    });
  }

  getEmployer(): any { return this.job?.employer; }
  getInitial(name: string) { return name ? name.charAt(0).toUpperCase() : '?'; }
  getCategoryEmoji(v: string): string {
    const map: any = { construction:'🏗️', domestic:'🏠', agriculture:'🌾', electrical:'⚡', plumbing:'🔧', carpentry:'🪚', driving:'🚗', cooking:'🍳', laundry:'👕', delivery:'📦', gardening:'🌿', security:'🔐', other:'💼' };
    return map[v] || '💼';
  }
  getStars(n: number) { return Array(5).fill(0).map((_,i) => i < Math.round(n) ? '★' : '☆'); }
}

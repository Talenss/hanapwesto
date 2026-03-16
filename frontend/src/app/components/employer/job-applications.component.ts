import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApplicationService, RatingService, ToastService } from '../../services/services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {
  applications: any[] = [];
  loading = true;
  jobId = '';
  ratingModal: any = null;
  ratingData = { score: 5, comment: '' };
  submittingRating = false;

  constructor(private appService: ApplicationService, private ratingService: RatingService, private toast: ToastService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('jobId')!;
    this.appService.getJobApplications(this.jobId).subscribe({
      next: (res: any) => { this.applications = res.applications; this.loading = false; },
      error: () => this.loading = false
    });
  }

  updateStatus(app: any, status: string) {
    this.appService.updateStatus(app._id, status).subscribe({
      next: (res: any) => { app.status = res.application.status; this.toast.success('Status updated'); },
      error: (err: any) => this.toast.error(err.error?.message || 'Failed')
    });
  }

  openRating(app: any) { this.ratingModal = app; this.ratingData = { score: 5, comment: '' }; }

  submitRating() {
    this.submittingRating = true;
    this.ratingService.submit({ applicationId: this.ratingModal._id, ...this.ratingData }).subscribe({
      next: () => { this.toast.success('Rating submitted!'); this.ratingModal = null; this.submittingRating = false; },
      error: (err: any) => { this.toast.error(err.error?.message || 'Failed'); this.submittingRating = false; }
    });
  }

  getWorkerName(app: any) { return app.worker?.name || 'Unknown'; }
  getStars(n: number) { return Array(5).fill(0).map((_,i) => i < Math.round(n) ? '★' : '☆').join(''); }
}

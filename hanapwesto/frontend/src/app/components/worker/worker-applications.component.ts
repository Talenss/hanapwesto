import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationService, RatingService, ToastService } from '../../services/services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worker-applications',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './worker-applications.component.html',
  styleUrls: ['./worker-applications.component.scss']
})
export class WorkerApplicationsComponent implements OnInit {
  applications: any[] = [];
  loading = true;
  ratingModal: any = null;
  ratingData = { score: 5, comment: '' };
  submittingRating = false;

  constructor(private appService: ApplicationService, private ratingService: RatingService, private toast: ToastService) {}

  ngOnInit() {
    this.appService.getMyApplications().subscribe({
      next: (res: any) => { this.applications = res.applications; this.loading = false; },
      error: () => this.loading = false
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

  getJobTitle(app: any) { return app.job?.title || 'Unknown Job'; }
  getEmployerName(app: any) { return app.employer?.businessName || app.employer?.name || 'Unknown'; }
}

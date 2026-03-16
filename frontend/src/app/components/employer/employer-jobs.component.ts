import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ToastService } from '../../services/services';

@Component({
  selector: 'app-employer-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.scss']
})
export class EmployerJobsComponent implements OnInit {
  jobs: any[] = [];
  loading = true;
  confirmDelete: string | null = null;

  constructor(private jobService: JobService, private toast: ToastService) {}

  ngOnInit() {
    this.jobService.getMyJobs().subscribe({
      next: (res: any) => { this.jobs = res.jobs; this.loading = false; },
      error: () => this.loading = false
    });
  }

  updateStatus(job: any, status: string) {
    this.jobService.updateJob(job._id, { status }).subscribe({
      next: (res: any) => { job.status = res.job.status; this.toast.success('Job status updated'); },
      error: () => this.toast.error('Update failed')
    });
  }

  deleteJob(id: string) {
    this.jobService.deleteJob(id).subscribe({
      next: () => { this.jobs = this.jobs.filter(j => j._id !== id); this.toast.success('Job deleted'); this.confirmDelete = null; },
      error: () => this.toast.error('Delete failed')
    });
  }
}

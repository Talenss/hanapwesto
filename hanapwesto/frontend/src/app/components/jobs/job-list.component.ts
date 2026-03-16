import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Job, JOB_CATEGORIES, PAMPANGA_BARANGAYS } from '../../models/models';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  loading = true;
  total = 0; page = 1; pages = 1;
  filters: any = { search:'', category:'', barangay:'', payType:'', status:'open' };
  categories = JOB_CATEGORIES;
  barangays = PAMPANGA_BARANGAYS;

  constructor(private jobService: JobService, public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['category']) this.filters.category = p['category'];
      this.load();
    });
  }

  load() {
    this.loading = true;
    this.jobService.getJobs({ ...this.filters, page: this.page }).subscribe({
      next: (res: any) => { this.jobs = res.jobs; this.total = res.total; this.pages = res.pages; this.loading = false; },
      error: () => this.loading = false
    });
  }

  search() { this.page = 1; this.load(); }
  reset() { this.filters = { search:'', category:'', barangay:'', payType:'', status:'open' }; this.page = 1; this.load(); }
  goPage(p: number) { this.page = p; this.load(); window.scrollTo(0,0); }

  getCategoryLabel(v: string) { return this.categories.find(c => c.value === v)?.label || v; }
  getCategoryEmoji(v: string): string {
    const map: any = { construction:'🏗️', domestic:'🏠', agriculture:'🌾', electrical:'⚡', plumbing:'🔧', carpentry:'🪚', driving:'🚗', cooking:'🍳', laundry:'👕', delivery:'📦', gardening:'🌿', security:'🔐', other:'💼' };
    return map[v] || '💼';
  }
  getInitial(name: string) { return name ? name.charAt(0).toUpperCase() : '?'; }
  getEmployerName(employer: any): string {
    if (!employer) return 'Unknown';
    return employer.businessName || employer.name || 'Unknown';
  }
}

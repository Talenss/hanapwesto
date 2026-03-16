import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ToastService } from '../../services/services';
import { JOB_CATEGORIES, PAMPANGA_BARANGAYS, SKILL_SUGGESTIONS } from '../../models/models';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent {
  form: any = { title:'', description:'', category:'', skillsRequired:[], barangay:'', payType:'daily', payAmount:0, duration:'', slots:1, startDate:'' };
  skillInput = '';
  saving = false;
  categories = JOB_CATEGORIES;
  barangays = PAMPANGA_BARANGAYS;
  skillSuggestions = SKILL_SUGGESTIONS;

  constructor(private jobService: JobService, private toast: ToastService, private router: Router) {}
  tips = ['Be specific about the tasks and schedule','Include the exact daily or fixed rate','Mention the barangay location clearly','List required skills to attract the right applicants','Respond quickly to applications']

  addSkill() { const s = this.skillInput.trim(); if (s && !this.form.skillsRequired.includes(s)) this.form.skillsRequired.push(s); this.skillInput = ''; }
  addSuggested(s: string) { if (!this.form.skillsRequired.includes(s)) this.form.skillsRequired.push(s); }
  removeSkill(i: number) { this.form.skillsRequired.splice(i, 1); }

  submit() {
    if (!this.form.title || !this.form.description || !this.form.category || !this.form.barangay || !this.form.payAmount || !this.form.duration) {
      this.toast.error('Please fill in all required fields'); return;
    }
    this.saving = true;
    this.jobService.createJob(this.form).subscribe({
      next: () => { this.toast.success('Job posted successfully!'); this.router.navigate(['/employer/jobs']); },
      error: (err: any) => { this.toast.error(err.error?.message || 'Failed to post job'); this.saving = false; }
    });
  }
}

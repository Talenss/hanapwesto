import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/services';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  ratings: any[] = [];
  jobs: any[] = [];
  loading = true;

  constructor(private userService: UserService, private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe((res: any) => {
      this.user = res.user;
      this.loading = false;
    });
    this.userService.getUserRatings(id).subscribe((res: any) => {
      this.ratings = res.ratings;
    });
    if (this.user?.role === 'employer') {
      this.jobService.getJobs({ employer: id }).subscribe((res: any) => {
        this.jobs = res.jobs;
      });
    }
  }

  getInitial(name: string) { return name ? name.charAt(0).toUpperCase() : '?'; }
  getStars(n: number) { return Array(5).fill(0).map((_,i) => i < Math.round(n) ? '★' : '☆').join(''); }
  getAvailabilityLabel(a: string): string {
    const map: any = { 'full-time':'Full-time','part-time':'Part-time','weekends':'Weekends','flexible':'Flexible' };
    return map[a] || a;
  }
}

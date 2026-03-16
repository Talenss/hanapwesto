import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/services';
import { PAMPANGA_BARANGAYS, SKILL_SUGGESTIONS } from '../../models/models';

@Component({
  selector: 'app-worker-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit {
  workers: any[] = [];
  loading = true;
  total = 0;
  filters: any = { barangay: '', skill: '', availability: '' };
  barangays = PAMPANGA_BARANGAYS;
  skills = SKILL_SUGGESTIONS;

  constructor(private userService: UserService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.userService.getWorkers(this.filters).subscribe({
      next: (res: any) => { this.workers = res.workers; this.total = res.total; this.loading = false; },
      error: () => this.loading = false
    });
  }

  reset() { this.filters = { barangay: '', skill: '', availability: '' }; this.load(); }
  getInitial(name: string) { return name ? name.charAt(0).toUpperCase() : '?'; }
  getStars(n: number) { return Array(5).fill(0).map((_,i) => i < Math.round(n) ? '★' : '☆').join(''); }
}

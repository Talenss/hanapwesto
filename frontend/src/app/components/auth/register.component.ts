import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/services';
import { PAMPANGA_BARANGAYS, SKILL_SUGGESTIONS } from '../../models/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./auth.scss']
})
export class RegisterComponent implements OnInit {
  role: 'worker' | 'employer' = 'worker';
  form: any = { name:'', email:'', password:'', phone:'', barangay:'', skills:[], availability:'flexible', bio:'', dailyRate:0, businessName:'', businessType:'' };
  skillInput = '';
  loading = false;
  showPass = false;
  barangays = PAMPANGA_BARANGAYS;
  skillSuggestions = SKILL_SUGGESTIONS;

  constructor(private auth: AuthService, private toast: ToastService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => { if (p['role']) this.role = p['role']; });
  }

  addSkill() {
    const s = this.skillInput.trim();
    if (s && !this.form.skills.includes(s)) { this.form.skills.push(s); }
    this.skillInput = '';
  }

  addSuggested(skill: string) {
    if (!this.form.skills.includes(skill)) this.form.skills.push(skill);
  }

  removeSkill(i: number) { this.form.skills.splice(i, 1); }

  submit() {
    if (!this.form.name || !this.form.email || !this.form.password || !this.form.barangay) {
      this.toast.error('Please fill in all required fields'); return;
    }
    this.loading = true;
    this.auth.register({ ...this.form, role: this.role }).subscribe({
      next: (res: any) => {
        this.toast.success('Welcome to HanaPwesto, ' + res.user.name.split(' ')[0] + '!');
        this.router.navigate([this.role === 'worker' ? '/worker/dashboard' : '/employer/dashboard']);
      },
      error: (err: any) => { this.toast.error(err.error?.message || 'Registration failed'); this.loading = false; }
    });
  }
}

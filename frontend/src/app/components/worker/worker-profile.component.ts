import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, ToastService } from '../../services/services';
import { PAMPANGA_BARANGAYS, SKILL_SUGGESTIONS, User } from '../../models/models';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit {
  user: User | null = null;
  form: any = {};
  skillInput = '';
  saving = false;
  barangays = PAMPANGA_BARANGAYS;
  skillSuggestions = SKILL_SUGGESTIONS;

  constructor(private auth: AuthService, private userService: UserService, private toast: ToastService) {}

  ngOnInit() {
    this.user = this.auth.currentUser;
    this.form = {
      name: this.user?.name || '', phone: this.user?.phone || '',
      barangay: this.user?.barangay || '', bio: this.user?.bio || '',
      experience: this.user?.experience || '',
      availability: this.user?.availability || 'flexible',
      dailyRate: this.user?.dailyRate || 0,
      skills: [...(this.user?.skills || [])]
    };
  }

  addSkill() {
    const s = this.skillInput.trim();
    if (s && !this.form.skills.includes(s)) this.form.skills.push(s);
    this.skillInput = '';
  }
  addSuggested(s: string) { if (!this.form.skills.includes(s)) this.form.skills.push(s); }
  removeSkill(i: number) { this.form.skills.splice(i, 1); }

  save() {
    this.saving = true;
    this.userService.updateProfile(this.form).subscribe({
      next: (res: any) => {
        this.auth.updateLocalUser(res.user);
        this.user = res.user;
        this.toast.success('Profile updated!');
        this.saving = false;
      },
      error: (err: any) => { this.toast.error(err.error?.message || 'Update failed'); this.saving = false; }
    });
  }
}

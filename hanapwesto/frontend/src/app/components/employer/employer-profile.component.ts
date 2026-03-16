import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, ToastService } from '../../services/services';
import { PAMPANGA_BARANGAYS, User } from '../../models/models';

@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent implements OnInit {
  user: User | null = null;
  form: any = {};
  saving = false;
  barangays = PAMPANGA_BARANGAYS;

  constructor(private auth: AuthService, private userService: UserService, private toast: ToastService) {}

  ngOnInit() {
    this.user = this.auth.currentUser;
    this.form = { name: this.user?.name || '', phone: this.user?.phone || '', barangay: this.user?.barangay || '', businessName: this.user?.businessName || '', businessType: this.user?.businessType || '' };
  }

  save() {
    this.saving = true;
    this.userService.updateProfile(this.form).subscribe({
      next: (res: any) => { this.auth.updateLocalUser(res.user); this.user = res.user; this.toast.success('Profile updated!'); this.saving = false; },
      error: (err: any) => { this.toast.error(err.error?.message || 'Update failed'); this.saving = false; }
    });
  }
}

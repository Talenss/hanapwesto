import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./auth.scss']
})
export class LoginComponent {
  email = ''; password = ''; loading = false; showPass = false;
  constructor(private auth: AuthService, private toast: ToastService, private router: Router) {}
  submit() {
    if (!this.email || !this.password) return;
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.toast.success('Welcome back, ' + res.user.name.split(' ')[0] + '!');
        this.router.navigate([res.user.role === 'worker' ? '/worker/dashboard' : '/employer/dashboard']);
      },
      error: (err: any) => { this.toast.error(err.error?.message || 'Login failed'); this.loading = false; }
    });
  }
}

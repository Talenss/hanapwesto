import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastService } from './services/services';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <div class="toast-container">
      <div *ngFor="let t of (toastService.toasts$ | async)" class="toast toast-{{t.type}}">
        {{ t.message }}
      </div>
    </div>
  `,
  styles: [`main { min-height: calc(100vh - 64px); }`]
})
export class AppComponent implements OnInit {
  constructor(
    public toastService: ToastService,
    private auth: AuthService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.auth.getMe().subscribe();
      this.notifService.getAll().subscribe((res: any) => {
        this.notifService.setUnread(res.unreadCount);
      });
    }
  }
}

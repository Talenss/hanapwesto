import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService, ToastService } from '../../services/services';
import { Notification } from '../../models/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;

  constructor(private notifService: NotificationService, private toast: ToastService) {}

  ngOnInit() {
    this.notifService.getAll().subscribe({
      next: (res: any) => {
        this.notifications = res.notifications;
        this.notifService.setUnread(0);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  markRead(n: Notification) {
    if (n.isRead) return;
    this.notifService.markRead(n._id).subscribe();
    n.isRead = true;
  }

  markAllRead() {
    this.notifService.markAllRead().subscribe(() => {
      this.notifications.forEach(n => n.isRead = true);
      this.notifService.setUnread(0);
      this.toast.success('All notifications marked as read');
    });
  }

  getIcon(type: string): string {
    const map: any = {
      new_job: '💼', application_received: '📋', application_accepted: '✅',
      application_rejected: '❌', job_completed: '🏆', new_rating: '⭐'
    };
    return map[type] || '🔔';
  }

  get unreadCount() { return this.notifications.filter(n => !n.isRead).length; }
}

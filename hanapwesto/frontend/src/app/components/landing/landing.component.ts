import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(public auth: AuthService) {}
  steps = [
    { num:'1', icon:'📝', title:'Create Your Profile', desc:'Register as a worker or employer. No resume needed — just your name, barangay, and skills.' },
    { num:'2', icon:'🔍', title:'Browse or Post Jobs', desc:'Employers post jobs in minutes. Workers browse listings sorted by proximity.' },
    { num:'3', icon:'🤝', title:'Connect & Apply', desc:'Workers apply with a message. Employers review and accept the best match.' },
    { num:'4', icon:'⭐', title:'Rate & Build Trust', desc:'After every job, rate each other. Build your community reputation over time.' },
  ];
  categories = [
    { value:'construction', icon:'🏗️', label:'Construction' },
    { value:'domestic', icon:'🏠', label:'Domestic' },
    { value:'agriculture', icon:'🌾', label:'Agriculture' },
    { value:'electrical', icon:'⚡', label:'Electrical' },
    { value:'plumbing', icon:'🔧', label:'Plumbing' },
    { value:'carpentry', icon:'🪚', label:'Carpentry' },
    { value:'driving', icon:'🚗', label:'Driving' },
    { value:'cooking', icon:'🍳', label:'Cooking' },
    { value:'laundry', icon:'👕', label:'Laundry' },
    { value:'delivery', icon:'📦', label:'Delivery' },
    { value:'gardening', icon:'🌿', label:'Gardening' },
    { value:'security', icon:'🔐', label:'Security' },
    { value:'other', icon:'💼', label:'Other' },
  ];
  whys = [
    { title:'No Resume Required', desc:'Your skills speak louder than paper credentials. Tag your abilities and get found.' },
    { title:'Barangay-First Matching', desc:'Jobs are matched by proximity so you spend less time commuting.' },
    { title:'Mobile & Low-Bandwidth Friendly', desc:'Works on any phone, even on slow prepaid data connections.' },
    { title:'Community Trust Ratings', desc:'Build your reputation through ratings after every completed job.' },
  ];
  bigStats = [
    { num:'300K+', label:'Informal Workers in Pampanga' },
    { num:'500+', label:'Barangays to Serve' },
    { num:'38%', label:'Of Filipinos in Informal Work' },
    { num:'Free', label:'Always Free for Workers' },
  ];
}

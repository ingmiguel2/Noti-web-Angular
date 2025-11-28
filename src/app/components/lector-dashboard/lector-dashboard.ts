import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-lector-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './lector-dashboard.html',
  styleUrl: './lector-dashboard.css',
})
export class LectorDashboard { }
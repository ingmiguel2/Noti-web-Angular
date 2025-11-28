import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-editor-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './editor-dashboard.html',
  styleUrl: './editor-dashboard.css',
})
export class EditorDashboard { }

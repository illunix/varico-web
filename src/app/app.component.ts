import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'varico';
}

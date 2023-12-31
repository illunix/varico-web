import { CommonModule } from '@angular/common';
import { AccountSummaryDto } from './../../core/api-client/generated/varico-api-client/models/index';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VaricoApiClient } from '@app/core/api-client/varico-api-client';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-summary-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './account-summary-dialog.component.html',
  styleUrl: './account-summary-dialog.component.css'
})
export class AccountSummaryDialogComponent implements OnInit {
  public accountSummary = signal<AccountSummaryDto | undefined>(undefined);
  public isLoadingAccountSummary = signal<boolean>(true);
  public displayedColumns: string[] = ['amount', 'category', 'createdAt'];

  public constructor(
    private _varicoApi: VaricoApiClient,
    private _dialogRef: MatDialogRef<AccountSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public accountReferenceId: string 
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.getAccountSummary();
  }

  public onClose(): void {
    this._dialogRef.close();
  }

  private async getAccountSummary(): Promise<void> {
    try {
      const accSummary = await this._varicoApi.accounts.byAccountReferenceId(this.accountReferenceId).summary.get();

      this.accountSummary.update(() => accSummary);
    }
    finally {
      this.isLoadingAccountSummary.update(() => false);
    }
  }
}

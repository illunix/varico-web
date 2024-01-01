import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VaricoApiClient } from '@app/core/api-client/varico-api-client';
import { AccountSummaryDialogComponent } from '../account-summary-dialog/account-summary-dialog.component';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-remove-transaction-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './remove-transaction-dialog.component.html',
  styleUrl: './remove-transaction-dialog.component.css'
})
export class RemoveTransactionDialogComponent {
  public constructor(
    private _varicoApi: VaricoApiClient,
    private _snackBar: SnackBarService,
    private _dialogRef: MatDialogRef<AccountSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transactionReferenceId: string 
  ) { }

  public onClose(): void {
    this._dialogRef.close();
  }

  public async onRemove(): Promise<void> {
    try {
      await this._varicoApi.transactions.byTransactionReferenceId(this.transactionReferenceId).delete();

      this._snackBar.open('Successfully removed transaction');

      this._dialogRef.close(true);
    }
    catch {
      this._snackBar.open('Something went wrong while removing transaction');

      this._dialogRef.close(false);
    }
  }
}

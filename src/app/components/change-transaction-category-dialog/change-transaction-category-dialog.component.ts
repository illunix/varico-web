import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { VaricoApiClient } from '@app/core/api-client/varico-api-client';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { AccountSummaryDialogComponent } from '../account-summary-dialog/account-summary-dialog.component';
import { UpdateTransactionCategoryCommand } from '@app/core/api-client/generated/varico-api-client/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionReferenceIdWithCategory } from '@app/core/models/transactionReferenceIdWithCategory.model';

@Component({
  selector: 'app-change-transaction-category-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './change-transaction-category-dialog.component.html',
  styleUrl: './change-transaction-category-dialog.component.css'
})
export class ChangeTransactionCategoryDialogComponent implements OnInit {
  public form = new FormGroup({
    category: new FormControl(this.transactionReferenceIdWithCategory.category, Validators.required)
  });
  public transactionCategories = signal<string[]>([]);

  public constructor(
    private _varicoApi: VaricoApiClient,
    private _snackBar: SnackBarService,
    private _dialogRef: MatDialogRef<AccountSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transactionReferenceIdWithCategory: TransactionReferenceIdWithCategory 
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.getTransactionCategories();
  }

  public get f() {
    return this.form.controls;
  }

  public onClose(): void {
    this._dialogRef.close();
  }

  public async onChange(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    
    try {
      const cmd: UpdateTransactionCategoryCommand = {
        category: this.f.category.value!
      };

      await this._varicoApi.transactions.byTransactionReferenceId(this.transactionReferenceIdWithCategory.referenceId).category.patch(cmd);

      this._snackBar.open('Successfully changed transaction category');

      this._dialogRef.close(true);
    }
    catch {
      this._snackBar.open('Something went wrong while changing transaction category');

      this._dialogRef.close(false);
    }
  }

  private async getTransactionCategories(): Promise<void> {
    const transactionCategories = await this._varicoApi.transactionCategories.get();

    this.transactionCategories.update(() => transactionCategories ?? []);
  }
}

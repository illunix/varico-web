import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VaricoApiClient } from '@app/core/api-client/varico-api-client';
import { MatButtonModule } from '@angular/material/button';
import { AccountDto, CreateTransactionCommand } from '@app/core/api-client/generated/varico-api-client/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-transaction-dialog.component.html',
  styleUrl: './add-transaction-dialog.component.css'
})
export class AddTransactionDialogComponent implements OnInit {
  public form = new FormGroup({
    accountReferenceId: new FormControl(undefined, Validators.required),
    category: new FormControl(undefined, Validators.required),
    amount: new FormControl(undefined, [Validators.required, Validators.min(1)])
  });
  public transactionCategories = signal<string[]>([]);
  public accounts = signal<AccountDto[]>([]);

  public constructor(
    private _varicoApi: VaricoApiClient,
    private _snackBar: SnackBarService,
    private _dialogRef: MatDialogRef<AddTransactionDialogComponent>,
  ) { }

  public get f() {
    return this.form.controls;
  }

  public async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getTransactionCategories(),
      this.getAccounts()
    ])
  }

  public onClose(): void {
    this._dialogRef.close();
  }

  public async onAdd(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const cmd: CreateTransactionCommand = {
      category: this.f.category.value!,
      amount: this.f.amount.value!
    }

    try {
      await this._varicoApi.accounts.byAccountReferenceId(this.f.accountReferenceId.value!).transactions.post(cmd);

      this._snackBar.open('Successfully created transaction');

      this._dialogRef.close(true);
    }
    catch {
      this._snackBar.open('Something went wrong while creating transaction');

      this._dialogRef.close(false);
    }
  }

  private async getTransactionCategories(): Promise<void> {
    const transactionCategories = await this._varicoApi.transactionCategories.get();

    this.transactionCategories.update(() => transactionCategories ?? []);
  }

  private async getAccounts(): Promise<void> {
    const accounts = await this._varicoApi.accounts.get();

    this.accounts.update(() => accounts ?? []);
  }
}

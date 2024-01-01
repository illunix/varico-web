import { ChangeTransactionCategoryDialogComponent } from './../change-transaction-category-dialog/change-transaction-category-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TransactionDto } from '@app/core/api-client/generated/varico-api-client/models';
import { VaricoApiClient } from '@app/core/api-client/varico-api-client';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionsFiltersComponent } from './transactions-filters/transactions-filters.component';
import { RequestConfiguration } from '@microsoft/kiota-abstractions';
import { TransactionsRequestBuilderGetQueryParameters } from '@app/core/api-client/generated/varico-api-client/transactions';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AccountSummaryDialogComponent } from '../account-summary-dialog/account-summary-dialog.component';
import { AddTransactionDialogComponent } from '../add-transaction-dialog/add-transaction-dialog.component';
import { RemoveTransactionDialogComponent } from '../remove-transaction-dialog/remove-transaction-dialog.component';
import { TransactionReferenceIdWithCategory } from '@app/core/models/transactionReferenceIdWithCategory.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatGridListModule, MatButtonModule, MatProgressSpinnerModule, TransactionsFiltersComponent, AccountSummaryDialogComponent, AddTransactionDialogComponent, RemoveTransactionDialogComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  public displayedColumns: string[] = ['accountOwner', 'amount', 'category', 'createdAt', 'actions'];
  public transactions = signal<TransactionDto[]>([]);
  public isLoadingTransactions = signal<boolean>(true);

  public selectedCategory: string | undefined;

  public constructor(
    private _varicoApi: VaricoApiClient,
    private _dialog: MatDialog
  ) { } 

  public async ngOnInit(): Promise<void> {
    await this.getTransactions();
  }

  public onChangeSelectedCategory(category: string): void {
    this.getTransactions(category);
    this.selectedCategory = category;
  }

  public onOpenAccountSummaryDialog(accountReferenceId: string): void {
    this._dialog.open(AccountSummaryDialogComponent, {
      data: accountReferenceId,
      width: '1000px',
      height: '800px'
    });
  }

  public onOpenAddTransactionDialog(): void {
    this._dialog.open(AddTransactionDialogComponent, {
      width: '400px',
      height: '500px'
    }).afterClosed().subscribe(q => {
      if (q) {
        this.getTransactions(this.selectedCategory);
      }
    });
  }

  public onOpenChangeTransactionDialog(transactionReferenceId: string, transactionCategory: string): void {
    const transactionReferenceIdWithCategory: TransactionReferenceIdWithCategory = {
      referenceId: transactionReferenceId,
      category: transactionCategory
    };

    this._dialog.open(ChangeTransactionCategoryDialogComponent, {
      width: '400px',
      height: '200px',
      data: transactionReferenceIdWithCategory
    }).afterClosed().subscribe(q => {
      if (q) {
        this.getTransactions(this.selectedCategory);
      }
    });
  }

  public onOpenRemoveTransactionDialog(transactionReferenceId: string): void {
    this._dialog.open(RemoveTransactionDialogComponent, {
      width: '500px',
      height: '200px',
      data: transactionReferenceId
    }).afterClosed().subscribe(q => {
      if (q) {
        this.getTransactions(this.selectedCategory);
      }
    })
  }

  private async getTransactions(category?: string): Promise<void> {
    this.isLoadingTransactions.update(() => true);

    const reqConf: RequestConfiguration<TransactionsRequestBuilderGetQueryParameters> = {
      queryParameters: {
        category: category
      }
    };
    
    try {
      const transactions = await this._varicoApi.transactions.get(reqConf);

      this.transactions.update(() => transactions ?? []);
    }
    finally {
      this.isLoadingTransactions.update(() => false);
    }
  }
}

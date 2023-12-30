import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { VaricoApiClient } from '@app/core/api-client/varico-api-client';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './transactions-filters.component.html',
  styleUrl: './transactions-filters.component.css'
})
export class TransactionsFiltersComponent {
  public transactionCategories = signal<string[]>([]);

  @Output() public selectedCategory = new EventEmitter<string>();

  public constructor(private _varicoApi: VaricoApiClient) { }

  public async ngOnInit(): Promise<void> {
    await this.getTransactionCategories();
  }

  public onCategoryChange(change: MatSelectChange): void {
    this.selectedCategory.emit(change.value);
  }

  private async getTransactionCategories(): Promise<void> {
    const transactionCategories = await this._varicoApi.transactionCategories.get();

    this.transactionCategories.update(() => transactionCategories ?? []);
  }
}

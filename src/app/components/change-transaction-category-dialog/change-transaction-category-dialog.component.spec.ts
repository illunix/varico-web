import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTransactionCategoryDialogComponent } from './change-transaction-category-dialog.component';

describe('ChangeTransactionCategoryDialogComponent', () => {
  let component: ChangeTransactionCategoryDialogComponent;
  let fixture: ComponentFixture<ChangeTransactionCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeTransactionCategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeTransactionCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

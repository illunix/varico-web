import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryDialogComponent } from './account-summary-dialog.component';

describe('AccountSummaryDialogComponent', () => {
  let component: AccountSummaryDialogComponent;
  let fixture: ComponentFixture<AccountSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSummaryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

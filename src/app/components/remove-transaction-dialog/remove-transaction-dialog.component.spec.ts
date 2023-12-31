import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTransactionDialogComponent } from './remove-transaction-dialog.component';

describe('RemoveTransactionDialogComponent', () => {
  let component: RemoveTransactionDialogComponent;
  let fixture: ComponentFixture<RemoveTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveTransactionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

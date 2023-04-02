import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase currentPage', () => {
    const page = component.currentPage;
    component.next_page();

    expect(component.currentPage).toBeGreaterThan(page);
  });

  it('should decrease currentPage', () => {
    const page = component.currentPage;
    component.previous_page();

    if (component.currentPage !== 0) {
      expect(component.currentPage).toBeLessThan(page);
    } else {
      expect(component.currentPage).toBe(0);
    }
  });

  it('should set currentPage', () => {
    component.set_page(1);

    expect(component.currentPage).toBe(1);
  });
});

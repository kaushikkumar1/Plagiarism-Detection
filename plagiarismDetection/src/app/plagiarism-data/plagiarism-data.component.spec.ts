import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlagiarismDataComponent } from './plagiarism-data.component';

describe('PlagiarismDataComponent', () => {
  let component: PlagiarismDataComponent;
  let fixture: ComponentFixture<PlagiarismDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlagiarismDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlagiarismDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

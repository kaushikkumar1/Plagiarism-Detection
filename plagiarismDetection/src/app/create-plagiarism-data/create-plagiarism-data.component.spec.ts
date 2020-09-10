import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlagiarismDataComponent } from './create-plagiarism-data.component';

describe('CreatePlagiarismDataComponent', () => {
  let component: CreatePlagiarismDataComponent;
  let fixture: ComponentFixture<CreatePlagiarismDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlagiarismDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlagiarismDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

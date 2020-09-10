import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePlagiarismReportComponent } from './generate-plagiarism-report.component';

describe('GeneratePlagiarismReportComponent', () => {
  let component: GeneratePlagiarismReportComponent;
  let fixture: ComponentFixture<GeneratePlagiarismReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePlagiarismReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePlagiarismReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

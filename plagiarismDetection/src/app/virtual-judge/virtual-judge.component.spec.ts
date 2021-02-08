import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualJudgeComponent } from './virtual-judge.component';

describe('VirtualJudgeComponent', () => {
  let component: VirtualJudgeComponent;
  let fixture: ComponentFixture<VirtualJudgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualJudgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

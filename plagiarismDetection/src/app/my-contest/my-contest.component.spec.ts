import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContestComponent } from './my-contest.component';

describe('MyContestComponent', () => {
  let component: MyContestComponent;
  let fixture: ComponentFixture<MyContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyContestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

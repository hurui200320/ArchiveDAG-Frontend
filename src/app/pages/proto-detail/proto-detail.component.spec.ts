import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtoDetailComponent } from './proto-detail.component';

describe('ProtoDetailComponent', () => {
  let component: ProtoDetailComponent;
  let fixture: ComponentFixture<ProtoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

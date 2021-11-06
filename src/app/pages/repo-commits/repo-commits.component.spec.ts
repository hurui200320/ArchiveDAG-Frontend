import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCommitsComponent } from './repo-commits.component';

describe('RepoCommitsComponent', () => {
  let component: RepoCommitsComponent;
  let fixture: ComponentFixture<RepoCommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoCommitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

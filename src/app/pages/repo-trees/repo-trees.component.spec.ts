import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTreesComponent } from './repo-trees.component';

describe('RepoTreesComponent', () => {
  let component: RepoTreesComponent;
  let fixture: ComponentFixture<RepoTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoTreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

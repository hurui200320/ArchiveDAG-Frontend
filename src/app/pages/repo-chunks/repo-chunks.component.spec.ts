import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoChunksComponent } from './repo-chunks.component';

describe('RepoChunksComponent', () => {
  let component: RepoChunksComponent;
  let fixture: ComponentFixture<RepoChunksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoChunksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoChunksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

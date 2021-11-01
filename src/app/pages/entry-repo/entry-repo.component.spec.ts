import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRepoComponent } from './entry-repo.component';

describe('EntryRepoComponent', () => {
  let component: EntryRepoComponent;
  let fixture: ComponentFixture<EntryRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

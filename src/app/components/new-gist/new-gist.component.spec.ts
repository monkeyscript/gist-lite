import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGistComponent } from './new-gist.component';

describe('NewGistComponent', () => {
  let component: NewGistComponent;
  let fixture: ComponentFixture<NewGistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

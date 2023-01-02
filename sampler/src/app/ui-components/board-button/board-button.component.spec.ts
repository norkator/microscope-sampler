import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardButtonComponent } from './board-button.component';

describe('BoardButtonComponent', () => {
  let component: BoardButtonComponent;
  let fixture: ComponentFixture<BoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

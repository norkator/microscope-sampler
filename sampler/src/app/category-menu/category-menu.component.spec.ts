import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontMenuComponent } from './front-menu.component';

describe('FrontMenuComponent', () => {
  let component: FrontMenuComponent;
  let fixture: ComponentFixture<FrontMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

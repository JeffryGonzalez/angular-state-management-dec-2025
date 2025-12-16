import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperLib } from './super-lib';

describe('SuperLib', () => {
  let component: SuperLib;
  let fixture: ComponentFixture<SuperLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

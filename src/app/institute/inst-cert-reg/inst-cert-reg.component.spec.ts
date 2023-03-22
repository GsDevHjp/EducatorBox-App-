import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCertRegComponent } from './inst-cert-reg.component';

describe('InstCertRegComponent', () => {
  let component: InstCertRegComponent;
  let fixture: ComponentFixture<InstCertRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstCertRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstCertRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

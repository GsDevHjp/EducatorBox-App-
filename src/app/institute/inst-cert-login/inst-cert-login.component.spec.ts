import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCertLoginComponent } from './inst-cert-login.component';

describe('InstCertLoginComponent', () => {
  let component: InstCertLoginComponent;
  let fixture: ComponentFixture<InstCertLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstCertLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstCertLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFailComponent } from './login-fail.component';

describe('LoginFailComponent', () => {
  let component: LoginFailComponent;
  let fixture: ComponentFixture<LoginFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

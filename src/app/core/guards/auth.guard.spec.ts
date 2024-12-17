import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj(['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: AuthService, useValue: authService }],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should return true when the user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    expect(authGuard.canActivate()).toBeTrue();
  });
  it('should return false when the user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);

    expect(authGuard.canActivate()).toBeFalse();
  });
});

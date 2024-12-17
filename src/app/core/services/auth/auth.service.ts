import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { map, Observable } from 'rxjs';
import { UserModel } from '../../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly apiService = inject(ApiService);
  private user = signal<UserModel | null>(null);

  authLogin(email: string, password: string): Observable<UserModel[]> {
    return this.apiService
      .get<UserModel[]>('users', `email:${email}&password:${password}`)
      .pipe(
        map((users: UserModel[]) => {
          if (users.length > 0) {
            const user = users.find(
              (user: UserModel) =>
                user.password === password && user.email === email,
            );
            if (user) {
              this.user.set(user);
              localStorage.setItem('userId', user.id.toString());
              return users;
            }
            return users;
          } else {
            return [];
          }
        }),
      );
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('userId');
    return !!authToken;
  }
}

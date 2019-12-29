import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoading: boolean = false;
  public endpoint: string = 'auth';
  constructor(
    private http: HttpClient
  ) { }

  authenticate(user: { cpf: string, password: string }): Promise<any> {
    this.isLoading = true;
    return this.http.post(`@rhi-api/${this.endpoint}`, user)
      .pipe(
        finalize(() => this.isLoading = false),
        map(userReturn => {
          localStorage.setItem('user', JSON.stringify(userReturn));
          return userReturn;
        })
      )
      .toPromise();
  }

  create(data): Promise<any> {
    this.isLoading = true;
    return this.http.post(`@rhi-api/${this.endpoint}`, data)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }

  logoff() {

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  isLoading: boolean = false;
  public endpoint: string = 'clients';
  constructor(
    private http: HttpClient
  ) { }
  loadClients(): Promise<any>{
    this.isLoading = true;
    return this.http.get(`@rhi-api/${this.endpoint}`)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }
}

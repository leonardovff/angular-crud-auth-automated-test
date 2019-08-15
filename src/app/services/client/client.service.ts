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
  getById(id: number): Promise<any>{
    console.log(id, 'get');
    this.isLoading = true;
    return this.http.get(`@rhi-api/${this.endpoint}/${id}`)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }
  update(id: number, data): Promise<any>{
    console.log(data, 'update');
    this.isLoading = true;
    return this.http.patch(`@rhi-api/${this.endpoint}/${id}`, data)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }

  create(data): Promise<any>{
    console.log(data, 'create');
    this.isLoading = true;
    return this.http.post(`@rhi-api/${this.endpoint}`, data)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';

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
    this.isLoading = true;
    return this.http.get(`@rhi-api/${this.endpoint}/${id}`)
      .pipe(
        finalize(() => this.isLoading = false),
        map(client => {
          const birth_date = client['birth_date'].split('-');
          client['birth_date'] = `${birth_date[2]}/${birth_date[1]}/${birth_date[0]}`;
          return client;
        })
      )
      .toPromise();
  }
  update(id: number, data): Promise<any>{
    this.isLoading = true;
    data = {...data};

    const birth_date = data.birth_date.split('/');
    data['birth_date'] = `${birth_date[2]}-${birth_date[1]}-${birth_date[0]}`;

    return this.http.patch(`@rhi-api/${this.endpoint}/${id}`, data)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }

  create(data): Promise<any>{
    this.isLoading = true;
    return this.http.post(`@rhi-api/${this.endpoint}`, data)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }

  delete(id: number): Promise<any>{
    this.isLoading = true;
    return this.http.delete(`@rhi-api/${this.endpoint}/${id}`)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .toPromise();
  }
}

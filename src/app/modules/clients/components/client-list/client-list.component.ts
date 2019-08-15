import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  users: Array<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private client: ClientService
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.client
      .loadClients()
      .then(data => {
        this.users = data
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/modules/shared/services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import { ClientInterface } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {
  private client: ClientInterface;
  constructor(
    private service: ClientService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.service.getById(params.id)
          .then(data => {
            this.client = data
          })
      });
  }

}

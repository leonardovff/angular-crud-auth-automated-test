import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientInterface } from 'src/app/interfaces/client.interface';
import { ShowMessageService } from 'src/app/components/show-message/show-message.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {
  private client: ClientInterface;
  constructor(
    private service: ClientService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private message: ShowMessageService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.service.getById(params.id)
          .then(data => {
            this.client = data
          })
          .catch(() => {
            this.message.show("Cliente não encontrado");
            this.route.navigate(['./../']);
          })
      });
  }
  delete(){
    this.service
      .delete(this.client.id)
      .then(() => {
        this.message.show("Cliente excluido");
        this.route.navigate(['./../']);
      }).catch(() => {
        this.message.show("Erro ao excluir o usuário");
      })
  }

}

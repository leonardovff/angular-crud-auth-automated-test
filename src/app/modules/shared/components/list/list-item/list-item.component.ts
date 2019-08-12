import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rhi-ui-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input('route') route: string;
  @Input('title') title: string;

  constructor() { }

  ngOnInit() {
  }

}

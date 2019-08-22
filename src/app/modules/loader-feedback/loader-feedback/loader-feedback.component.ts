import { Component, OnInit } from '@angular/core';
import { LoaderFeedbackService } from '../loader-feedback.service';

@Component({
  selector: 'app-loader-feedback',
  templateUrl: './loader-feedback.component.html',
  styleUrls: ['./loader-feedback.component.scss']
})
export class LoaderFeedbackComponent implements OnInit {
  isLoading: boolean;
  constructor(private service: LoaderFeedbackService) { }

  ngOnInit() {
    this.service.isLoading.subscribe(flag => {
      this.isLoading = flag;
    });
  }

}

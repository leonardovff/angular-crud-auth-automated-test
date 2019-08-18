import { TestBed } from '@angular/core/testing';

import { ShowMessageService } from './show-message.service';

describe('ShowMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should show the message', async() => {
    const arrage = "Error no envio dos dados";
    const service: ShowMessageService = TestBed.get(ShowMessageService);
    const listener = new Promise(res => service.message.subscribe(message=> res(message))) ;
    service.show(arrage, 1000);
    const message = await listener;
    expect(message).toBeTruthy(arrage);
    const messageSecondMoment = await new Promise(res => service.message.subscribe(message=> res(message)));
    expect(messageSecondMoment).toBe(null)
  });
});

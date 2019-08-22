import { TestBed } from '@angular/core/testing';

import { LoaderFeedbackService } from './loader-feedback.service';

describe('LoaderFeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should show the load component with one it in the list', async () => {
    const arrage = 'item1';
    const service: LoaderFeedbackService = TestBed.get(LoaderFeedbackService);
    const flagBeforeAdd = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagBeforeAdd).toBeFalsy('Flag used to control the load in the start');
    service.addLoad(arrage);
    const flagAfterAdd = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagAfterAdd).toBeTruthy('Flag used to control the load in the end');
    service.removeLoad(arrage);
    const flagAfterRemove = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagAfterRemove).toBeFalsy('Flag used to control the load in the end');
  });
  it('should show keep load when haved two item in the list but only one was remove', async () => {
    const arrage = ['item1', 'item2'];
    const service: LoaderFeedbackService = TestBed.get(LoaderFeedbackService);
    const flagBeforeAdd = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagBeforeAdd).toBeFalsy('Flag used to control the load in the start');
    service.addLoad(arrage[0]);
    service.addLoad(arrage[1]);
    const flagAfterAdd = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagAfterAdd).toBeTruthy('Flag used to control the load in the end');
    service.removeLoad(arrage[1]);
    const flagAfterRemove = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagAfterRemove).toBeTruthy('Flag used to control the load in the end');
  });

  it('should show remove load when haved two item in the list and removed them', async () => {
    const arrage = ['item1', 'item2'];
    const service: LoaderFeedbackService = TestBed.get(LoaderFeedbackService);
    const flagBeforeAdd = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagBeforeAdd).toBeFalsy('Flag used to control the load in the start');
    service.addLoad(arrage[0]);
    service.addLoad(arrage[1]);
    const flagAfterAdd = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagAfterAdd).toBeTruthy('Flag used to control the load in the end');
    service.removeLoad(arrage[1]);
    service.removeLoad(arrage[0]);
    const flagAfterRemove = await new Promise(res => service.isLoading.subscribe(flag => res(flag)));
    expect(flagAfterRemove).toBeFalsy('Flag used to control the load in the end');
  });
});

import { DateValidator } from "./date.validator";

describe('ValidateDate', () => {
  it('shoud validate valid date', () => {
    const arr = {
      input: [
        "25/01/2018",
        "15/01/1996",
        "03/01/1991",
        "30/01/1920",
      ]
    }
    arr.input.forEach(date => {
      expect(DateValidator.valid_date(date)).toBeTruthy(date);
    });
  });

  it('shoud not validate invalid date', () => {
    const arr = {
      input: [
        '09',
        '10/02',
        '10/0',
        '10/02',
        '10/02/19',
        '31/02/2019'
      ]
    }
    arr.input.forEach(date => {
      expect(DateValidator.valid_date(date)).toBeFalsy(date);
    });
  });
});

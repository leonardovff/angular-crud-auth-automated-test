import { CpfValidator } from './cpf.validator'

describe('ValidateEmail', () => {
  it('shoud validate valid cpf', () => {
    const arr = {
      input: [
        "758.515.880-71",
        "855.544.940-56",
        "269.658.170-38",
        "647.037.650-98"
      ]
    }
    arr.input.forEach(cpf => {
      expect(CpfValidator.valid_cpf(cpf)).toBe(true);
    });
  });

  it('shoud not validate invalid cpf', () => {
    const arr = {
      input: [
        "758.315.880-71",
        "855.544.940-46",
        "269.652.170-38",
        "647.037.450-98"
      ]
    }
    arr.input.forEach(cpf => {
      expect(CpfValidator.valid_cpf(cpf)).toBeFalsy(cpf);
    });
  });
});

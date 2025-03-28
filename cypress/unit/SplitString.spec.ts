import SplitString from '../../app/lib/splitString';

describe('SplitString Function Tests', () => {
  it('splits a string by comma into an array', () => {
    const input = "apple,banana,orange";
    const expected = ["apple", "banana", "orange"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles strings without any commas correctly', () => {
    const input = "apple";
    const expected = ["apple"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles an empty string correctly', () => {
    const input = "";
    const expected = [""];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles strings with multiple commas correctly', () => {
    const input = "one,,two,three,";
    const expected = ["one", "", "two", "three", ""];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles strings with trailing commas correctly', () => {
    const input = "one,two,three,";
    const expected = ["one", "two", "three", ""];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles strings with leading commas correctly', () => {
    const input = ",one,two,three";
    const expected = ["", "one", "two", "three"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('splits a string by comma into an array', () => {
    const input = "apple,banana,orange";
    const expected = ["apple", "banana", "orange"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles strings without any commas correctly', () => {
    const input = "apple";
    const expected = ["apple"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });


  it('handles an empty string correctly', () => {
    const input = "";
    const expected = [""];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });

  it('handles strings with multiple commas correctly', () => {
    const input = "one,,two,three,";
    const expected = ["one", "", "two", "three", ""];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
  });


  it('handles strings with newline characters', () => {
    const input = "apple,\nbanana,\norange";
    const expected = ["apple", "\nbanana", "\norange"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
});

it('handles strings with tab characters', () => {
    const input = "apple,\tbanana,\torange";
    const expected = ["apple", "\tbanana", "\torange"];
    const result = SplitString(input);
    expect(result).to.deep.equal(expected);
});

it('handles strings with mixed types correctly', () => {
  const input = "apple,123,true,false";
  const expected = ["apple", "123", "true", "false"];
  const result = SplitString(input);
  expect(result).to.deep.equal(expected);
});

it('handles strings with only commas', () => {
  const input = ",,,,";
  const expected = ["", "", "", "", ""];
  const result = SplitString(input);
  expect(result).to.deep.equal(expected);
});
});

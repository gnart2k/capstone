/// <reference types="cypress" />

import calculateAge from '../../app/lib/calculateAge';

describe('calculateAge function', () => {
  beforeEach(() => {
    cy.clock(new Date(2024, 6, 24).getTime());
  });

  it('should correctly calculate age given a birth date', () => {
    expect(calculateAge('2000-01-01')).to.equal('24');
    expect(calculateAge(new Date(2000, 0, 1))).to.equal('24');
  });
  it('should handle leap year dates correctly', () => {
    expect(calculateAge('2000-02-29')).to.equal('24');
    expect(calculateAge('2004-02-29')).to.equal('20');
    expect(calculateAge('1900-02-28')).to.equal('124'); // 1900 was not a leap year
    expect(calculateAge('2000-03-01')).to.equal('24');
  });



  it('should handle different valid date formats', () => {
    expect(calculateAge('01/01/2000')).to.equal('24');
    expect(calculateAge('2000-01-01T00:00:00Z')).to.equal('24');
    expect(calculateAge('01-01-2000')).to.equal('24');
  });

  it('should handle time part in Date object', () => {
    expect(calculateAge(new Date('2000-01-01T12:00:00Z'))).to.equal('24');
    expect(calculateAge(new Date('2000-01-01T00:00:00Z'))).to.equal('24');
  });

  it('should handle dates in different calendar systems (if applicable)', () => {
    expect(calculateAge('2000-01-01')).to.equal('24');
  });
});


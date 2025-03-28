import { validateEmail } from '../../app/lib/validate';
describe('validateEmail function', () => {
  it('should return true for valid email address: test@example.com', () => {
    expect(validateEmail('test@example.com')).to.be.true;
  });

  it('should return true for valid email address: user.name+tag+sorting@example.com', () => {
    expect(validateEmail('user.name+tag+sorting@example.com')).to.be.true;
  });

  it('should return true for valid email address: x@example.com', () => {
    expect(validateEmail('x@example.com')).to.be.true;
  });

  it('should return true for valid email address: example-indeed@strange-example.com', () => {
    expect(validateEmail('example-indeed@strange-example.com')).to.be.true;
  });

  it('should return true for valid email address: admin@mailserver1', () => {
    expect(validateEmail('admin@mailserver1')).to.be.true;
  });

  it('should return false for invalid email address: plainaddress', () => {
    expect(validateEmail('plainaddress')).to.be.false;
  });

  it('should return false for invalid email address: @missingusername.com', () => {
    expect(validateEmail('@missingusername.com')).to.be.false;
  });

  it('should return false for invalid email address: username@.com', () => {
    expect(validateEmail('username@.com')).to.be.false;
  });

  it('should return false for invalid email address: username@com', () => {
    expect(validateEmail('username@com')).to.be.false;
  });

  it('should return false for invalid email address: username@com.', () => {
    expect(validateEmail('username@com.')).to.be.false;
  });

  it('should return false for invalid email address: username@-com.com', () => {
    expect(validateEmail('username@-com.com')).to.be.false;
  });

  it('should return false for invalid email address: username@.com.', () => {
    expect(validateEmail('username@.com.')).to.be.false;
  });

  it('should return false for email address with space at start: " test@example.com"', () => {
    expect(validateEmail(' test@example.com')).to.be.false;
  });

  it('should return false for email address with space in domain: "test@ example.com"', () => {
    expect(validateEmail('test@ example.com')).to.be.false;
  });

  it('should return false for email address with space before top-level domain: "test@example .com"', () => {
    expect(validateEmail('test@example .com')).to.be.false;
  });
});

import { generateSignature} from "@/app/lib/generator";

import CryptoJS from 'crypto-js';

describe('generateSignature', () => {
  it('should generate correct signature for given parameters', () => {
    const params = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3'
    };
    const checksumKey = 'yourChecksumKey';
    const expectedSignature = CryptoJS.HmacSHA256(
      'param1=value1&param2=value2&param3=value3',
      checksumKey
    ).toString(CryptoJS.enc.Hex);

    const signature = generateSignature(params, checksumKey);

    expect(signature).to.equal(expectedSignature);
  });
  it('should generate different signatures for different keys', () => {
    const params = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3'
    };
    const checksumKey1 = 'checksumKey1';
    const checksumKey2 = 'checksumKey2';

    const signature1 = generateSignature(params, checksumKey1);
    const signature2 = generateSignature(params, checksumKey2);

    expect(signature1).to.not.equal(signature2);
  });
  it('should generate the same signature for the same parameters regardless of order', () => {
    const params1 = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3'
    };
    const params2 = {
      param3: 'value3',
      param1: 'value1',
      param2: 'value2'
    };
    const checksumKey = 'yourChecksumKey';

    const signature1 = generateSignature(params1, checksumKey);
    const signature2 = generateSignature(params2, checksumKey);

    expect(signature1).to.equal(signature2);
  });
});



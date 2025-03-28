import  {getAddressFromCoordinates}  from '../../app/lib/getAddress';
describe('getAddressFromCoordinates Function Tests', () => {
    beforeEach(() => {
     
      cy.intercept('GET', '**/maps/api/geocode/json*', (req) => {
        if (req.url.includes('40.714224,-73.961452')) {
          req.reply({ fixture: 'geocode_success.json' });
        } else {
          req.reply({ fixture: 'geocode_failure.json' });
        }
      });
    });
  
    it('successfully retrieves an address from coordinates', () => {
      const { getAddressFromCoordinates } = require('../../src/utils/getAddressFromCoordinates');
      const testCoords = { latitude: 40.714224, longitude: -73.961452 };
      getAddressFromCoordinates(testCoords).then((address: any) => {
        expect(address).to.equal('277 Bedford Ave, Brooklyn, NY 11211, USA');
      });
    });
  
    it('handles failure when the API cannot find the address', () => {
      const { getAddressFromCoordinates } = require('../../src/utils/getAddressFromCoordinates');
      const testCoords = { latitude: 0, longitude: 0 };
      getAddressFromCoordinates(testCoords).catch((error: any) => {
        expect(error).to.equal('not found');
      });
    });

    beforeEach(() => {
      // Setting up intercepts for each test case scenario
      cy.intercept('GET', '**/maps/api/geocode/json*', (req) => {
        const { latitude, longitude } = req.query;
        if (latitude === '40.714224' && longitude === '-73.961452') {
          req.reply({ fixture: 'geocode_success.json' });  // Successful API response
        } else if (latitude === '90.0000' && longitude === '135.0000') {
          req.reply({ fixture: 'geocode_api_limit.json' });  // API limit reached response
        } else {
          req.reply({ fixture: 'geocode_failure.json' });  // Failed to find address
        }
      });
    });
  
    it('successfully retrieves an address from coordinates', () => {
      const testCoords = { latitude: 40.714224, longitude: -73.961452 };
      getAddressFromCoordinates(testCoords).then((address) => {
        expect(address).to.equal('277 Bedford Ave, Brooklyn, NY 11211, USA');
      });
    });
  
    it('handles failure when the API cannot find the address', () => {
      const testCoords = { latitude: 0, longitude: 0 };
      getAddressFromCoordinates(testCoords).catch((error) => {
        expect(error).to.equal('not found');
      });
    });

    it('handles API limit errors gracefully', () => {
      const testCoords = { latitude: 90.0000, longitude: 135.0000 };
      getAddressFromCoordinates(testCoords).catch((error) => {
        expect(error).to.match(/API limit reached/);  // Check if the error message includes 'API limit reached'
      });
    });

    it('verifies network error handling', () => {
      // Force a network error
      cy.intercept('GET', '**/maps/api/geocode/json*', {
        forceNetworkError: true
      }).as('getAddressFail');

      const testCoords = { latitude: 40.714224, longitude: -73.961452 };
      getAddressFromCoordinates(testCoords).catch((error) => {
        expect(error.message).to.include('Network Error');  // Ensure the error message includes 'Network Error'
      });
    });

    it('checks handling of unexpected JSON structure', () => {
      // Intercept to reply with an unexpected JSON structure
      cy.intercept('GET', '**/maps/api/geocode/json*', {
        body: { unexpectedKey: 'Unexpected Value' }
      }).as('unexpectedJSON');

      const testCoords = { latitude: 40.714224, longitude: -73.961452 };
      getAddressFromCoordinates(testCoords).catch((error) => {
        expect(error).to.equal('not found');  // Assuming the function rejects with 'not found' on unexpected JSON
      });
    });
  });
  
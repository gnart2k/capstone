import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    //specPattern: 'cypress/unit/calculateAge.spec.ts',
    //specPattern: 'cypress/unit/removeVietnameseTones.spec.ts',
    //specPattern: 'cypress/unit/getDistanceFromLatLon.spec.ts',
    //specPattern: 'cypress/unit/SplitString.spec.ts',
    //specPattern: 'cypress/unit/validateEmail.spec.ts',
    // specPattern: 'cypress/unit/getAddressFromCoordinates.spec.ts',
    //specPattern: 'cypress/unit/generateSignature.spec.ts',
    // specPattern: 'cypress/unit/dateToArray.spec.ts',
    specPattern: ['cypress/unit/calculateAge.spec.ts', 'cypress/unit/convertTimeToFloat.spec.ts']


  },
});

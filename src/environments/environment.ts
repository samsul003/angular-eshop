// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import "zone.js/dist/zone-error";


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBxxln_ziNXG-KdCX2dmsQMaYEh94sh7yc",
    authDomain: "eshopangular-52bb0.firebaseapp.com",
    databaseURL: "https://eshopangular-52bb0.firebaseio.com",
    projectId: "eshopangular-52bb0",
    storageBucket: "eshopangular-52bb0.appspot.com",
    messagingSenderId: "1003380658291",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

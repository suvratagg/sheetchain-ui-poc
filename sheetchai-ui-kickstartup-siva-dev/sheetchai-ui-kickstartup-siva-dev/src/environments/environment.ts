// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // custom api paths:

  findUser: 'http://13.235.242.112:8080/find',
  findAllUsers: 'http://13.235.242.112:8080/findAll',
  addUser: 'http://13.235.242.112:8080/save',
  updateUser: 'http://13.235.242.112:8080/updateUser',
  registerUser: 'http://13.235.242.112:8080/registerUser',
  getUserName: 'http://13.235.242.112:8080/findUsername',
  getPassword: 'http://13.235.242.112:8080/checkPassword',
  updateAdmin: 'http://13.235.242.112:8080/updateAdmin',
  logout: 'http://13.235.242.112:8080/logout'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

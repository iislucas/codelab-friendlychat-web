# Friendlychat

## Project setup notes...

### Local offline use...

1. Copy `src/environments/firebase-config.template.ts` to `src/environments/firebase-config.ts` and fill in the values from the Firebase project you are working on. 

1. Run `npm install` to install the dependencies; don't run `npm audit fix` - it usually breaks stuff.

1. Run `cd functions && npm install` to install the dependencies for firebase functions.

1. Run: `firebase use add <projectname>` to setup firebase in this directory to use your project.

1. If working with Visual Studio Code (recommended), Install "Angular Langauge Services" extension.

1. Run: `npm run start` to start a local build, and make sure the front end can build. Control-c to stop it.
  1. If a port is in use; don't use a different port! This means you are likely to have two different builds running in parallel if you do that, it can get emulators and other things confused. 

1. Run `npm run emulate` to start a full local firebase emulator

You should see something like this when it works...

```
┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘

┌────────────────┬────────────────┬─────────────────────────────────┐
│ Emulator       │ Host:Port      │ View in Emulator UI             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Authentication │ 127.0.0.1:9099 │ http://127.0.0.1:4000/auth      │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Functions      │ 127.0.0.1:5001 │ http://127.0.0.1:4000/functions │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Firestore      │ 127.0.0.1:8080 │ http://127.0.0.1:4000/firestore │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Hosting        │ 127.0.0.1:5000 │ n/a                             │
├────────────────┼────────────────┼─────────────────────────────────┤
│ Storage        │ 127.0.0.1:9199 │ http://127.0.0.1:4000/storage   │
└────────────────┴────────────────┴─────────────────────────────────┘
  Emulator Hub running at 127.0.0.1:4400
  Other reserved ports: 4500, 9150

```

### Deploying and using online...

1. Run: `firebase auth login` to authentictae with your cloud project.

1. TODO: add more instructions...

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

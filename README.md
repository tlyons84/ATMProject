#intro
This is a fully integrated WebService. That utilizes the understanding of Rest. The BackEnd is mocked through a serious of complex service layers in angular. That all wrap around a full fledged Data service layer. Which the outmost components can not see for data protection purposes. The APP was designed with data in mind. Using full scale typescript interfaces, The service Layers could easily be picked up and moved into a nestJS service with a rest api and controler layer format. 

It was in that in mind that i designed this service. We respect JSON formatting utilizing json.Stringfy to insert in local storage while parsing it on removal. 

each object has an interface. Each interface is utilized to mutate the returned data to its respective map. 

this makes components simplestic and easy to use. Merely fetching user inputed data from the forms update the concerned object in storage. 

There is an HTTP layer for further intergration.

Additional thought was given for things such as: Deposites, UserProfiles. 

The abbility to have a guest and/or a profile though with the given time constraints i was not able to fully implement the additional features. 

I will be able to discuss the full possibilities and future itterations that i plan to perform on this project.


# ATM

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.



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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

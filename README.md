# airlineBookingApp

Assignment for Airline Booking App

## Video Demo Link

1. [Angular Application Walkthrough](https://youtu.be/gK-AQXZo6nQ)
2. [E2E Testing with Protractor](https://youtu.be/JeDYzdV0fRM)

## Setup Instructions (Angular App)

1. Clone this repo to your local machine and navigate to the root folder of this project
2. In a terminal window, type `cd frontend` and hit enter to get into the angular application's folder, then `npm install` to install angular dependencies
3. Type `npm run server` and hit enter. This starts up the JSON-server required for the mock API/backend.
4. run in a separate terminal window, `ng serve -o`. This builds the application and opens a browser with the application loaded automatically.

## Setup Instructions (Protractor E2E Tests)

1. In a new terminal window, navigate to the root of this project
2. In a new terminal window, type `npm install` and hit enter to install protractor dependencies
3. Get into the "tests" folder by typing `cd tests` , then hitting enter
4. type `webdriver-manager update` and hit enter to ensure updates are performed
5. then `webdriver-manager start` to start the selenium server
6. In a new terminal window, type and run `protractor conf.js`, to run full test suite

## Functionalities

- Implemented
  1. Filtering booked flights on the bookings view page of the logged in Agent, by airline name and date of departure
  2. Booking new flights, delete flights and confirm the status of booked flights.
  3. Register new Agent account
  4. Login/Logout of agent account.
  5. Passwor Reset (aka Forgot Password)

## E2E Testing

Framework: Protractor
Webdriver: Selenium Webdriver

## Challenges & Reflections

1. Angular:
   Creating an Angular project from scratch was a daunting task, since I've had no prior practical experience with Angular.
   There was a steep learning curve to understand how the many moving parts of an Angular application (components, services, Observable data, etc) comes together.
   My prior experience with React softened the blow ever so slightly, but it's always intimidating learning new technologies, nevermind that we had to craft an application
   out of it!
2. Typescript:
   Alongside Angular, typescript was also a (fairly) new language for me, but unlike Angular, typescript was a little easier to pick up, being a superset of javascript.
   Having done some Java prior to this assignment, the static typing of data was not a foreign concept. It did provide a healthy challenge when diving into Angular though.
3. Selenium, Protractor e2e testing
   Having had no prior experience in testing, the initial learning curve was challenging, though the interaction was primarily through Protractor. There're many ways to pick out a specific element from a page, however there were some obscure behaviours that required alot of research to find solutions for. One of these behaviours was that if an element (or in this case a button, specifically) was not within view of the browser's viewport, any attempt to click() on the element would fail. The solution to this was to identify the coordinates of the element, go to the specified coordinates, such that they are within the viewport of the browser, and then proceeding with click().
4. The project in this case used a package called json-server, which served as a mock backend for this application. This was suggested by the team in order to simplify the developemnt process for the assignment, rather than building an Express/NodeJS/Mongo backend from scratch. Funnily this was my first course of action, but after initialy teething issues, the backend was moved over to json-server instead, since i can still make RESTFUL calls the same way i would with an Express backend.

## Tech Stack & Justification:

- Frontend
  1. Angular
  2. Typescript
  3. axios
- Backend (implemented)
  1. JSON-Server
- Backend (Proposed)
  1. Express
  2. NodeJS
  3. Mongoose (for MongoDB)
- Database (Proposed)
  1. MongoDB
- Testing
  1. Protractor
  2. Selenium WebDriver

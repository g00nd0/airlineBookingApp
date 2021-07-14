# Agent Airline Booking App

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

## Setup Instructions (Optional, For WSL users)

The following steps are specific to users attempting to run this in the Windows Subsystem for Linux (WSL) environment, namely WSL2, which was what this project was developed in.

Since the host OS (Windows 10) and WSL2 are essentially in separate environments (WSL2 has its own virtualized ethernet adapter, and therefore a unique IP address from the host machine), Selenium Webdriver running in WSL2 will not be able to locate the browser binaries in the host OS; it only attempts to look for it in its own environment.

While it is possible to specify the location of the binaries/exe files on the hostmachine (Windows' `C:/` drive is mounted in WSL under /`mnt/c/`), several issues tend to occur, namely the browser (Google Chrome in this case) opening a blank window or error popups indicating issues with access permissions.

Ultimately, the intention here is to explore the option of running everyting within the WSL environment.
The following steps were based on [this tutorial](https://www.gregbrisebois.com/posts/chromedriver-in-wsl2/). You can refer to this if you need a more detailed step-by-step guide.

### In WSL:

1. Install Chrome and required dependencies

```bash
sudo apt-get update
sudo apt-get install -y curl unzip xvfb libxi6 libgconf-2-4
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
```

2. Install ChromeDriver
   \*Note: the URL specified below is for illustration only and may not be the latest version. Check [this link](https://chromedriver.chromium.org/) for the latest version.

```
wget https://chromedriver.storage.googleapis.com/86.0.4240.22/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/chromedriver
sudo chown root:root /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver
```

### In Host OS (Win10):

1. Download and install [VcXsrv](https://sourceforge.net/projects/vcxsrv/)
   VcXsrv essentially allows WSL to run Linux GUI applications, displaying and allowing for interaction in the Windows environment.
2. Run XLaunch in Windows. You can leave the settings at its default, but make sure that the option “Disable access control” is checked.
3. When prompted, select allow in the Windows Firewall prompt.
4. Open the CMD propmt and type `ipconfig`, then enter. Make a note of your Windows machine's IP address, you'll need that for the sectio n below.

### Back in WSL:

1. You will need to set the $DISPLAY environment variable to allow GUI applications to connect to VcXsrv in Windows. This can be added in the `.bashrc` located in the home folder (i.e. `/home/yourUserName/`)
2. In the Terminal, type `cd` and enter to make sure you're in your logged in user's home folder.
3. Type `nano .bashrc` and hit enter.
4. In scroll to the bottom of the file and type the following in a new line: (Replace `YOUR_WIN10_IP` with the IP address you noted in the previous section)
   `export DISPLAY=YOUR_WIN10_IP:0.0`
5. Hit **_Ctrl + X_**, then **_Y_** and **_ENTER_** to exit the Nano editor, and save your changes.
6. You may need to reload the terminal in order for the changes to take effect. You can do this by running `. ~/.bashrc` in the terminal
7. To test if the changes are successful, in the terminal, type and run `google-chrome`. This should open a new Chrome window in Windows, but is running from WSL.

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

# Employee Management System

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

## Description

A Node.js and MySQL asynchronous command-line app for keeping track of employee, department and role table databases at a company. MySQL2, Inquirer, Validator and dotenv packages are used. Data is stored in a mySQL database for future use. Database variables are stored in an .env file for added security.

## Installation

Download or clone the repository. Run `npm i` to install dependencies. In mySQL create database tables by first running schema and then seed files individually. Exit mySQL. Add your own credentials to the '.envExample' file. Trim the 'Example' part leaving just '.env'. Run `node index.js` or `npm start`. Follow the prompts.

## Usage

View, create, update or delete data entries corresponding to employees, departments and roles at a company. Assign Managers to employees or group and view by department. Overall budget for each department or all departments is available to query.

## Credits

MDN Web Docs was referenced for String methods split() and replace(), Node.js documentation for process.stdout.columns. These were used to center the data tables in the terminal window. MySQL joins were referenced at [W3Schools](https://www.w3schools.com/mysql/mysql_join.asp). Inquirer documentation for prompts was used from [here](https://www.npmjs.com/package/inquirer). This app follows criteria set out by edX Boot Camps homework guidelines and standards.

## Demo

A video showing the functionality of the employee management system can be found [here.](https://drive.google.com/file/d/1h5kSsPnSDht4ArUy9Gu_zOHtc0TunJWh/view?usp=drive_link)

## Tests

Testing is done with Jest. Run `npm test` to see some basic database querying.

## Questions

If you have any questions about this project, please contact me at [LinkedIn](https://www.linkedin.com/in/shawn-meister-bb646b29a/). More of my work can be viewed at [GitHub](https://github.com/CookingMeister).

## License

This project is licensed under the MIT license.

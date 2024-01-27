// const mysql = require('mysql2');
const inquirer = require("inquirer");
// const consoleTable = require('console.table');
// const db = require('./lib/utils/config.js');
const {
  viewAllEmployees,
  showAllDeparments,
  viewAllRoles,
  addDepartment,
  addEmployee,
  addRole,
  getDepts,
  getRoles
} = require("./lib/utils/utils.js");
// require('dotenv').config();
// require('console.table');
const validator = require("validator");

//   db.query('INSERT INTO {db} SET ?', data, (err, results) => {
//     if(err) throw err;
//     res.send('Values Inserted');
//   });

//   db.query('UPDATE {db} SET ? WHERE id = ?', [data, id], (err, results) => {
//     if(err) throw err;
//     res.send('Values Updated');
//   });
const welcomeMessage = () => {
  console.log("\n" + "Welcome to the company database!" + "\n");
};
const welcomeQueries = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do today?" + "\n",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",
      "EXIT",
    ],
  },
];
const departmentPrompt = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the department?",
    validate: (input) => {
      return validator.isEmpty(input) ? "Department name is required" : true;
    },
  },
];
const rolePrompt = [
  {
    type: "input",
    name: "title",
    message: "What is the title of the role?",
    validate: (input) => {
      return validator.isEmpty(input) ? "Role title is required" : true;
    },
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role?",
    validate: (input) => {
      return validator.isNumeric(input) ? true : "Salary is required";
    },
  },
  {
    type: "list",
    name: "department_id",
    message: "What department id is associated with this role?",
    choices: async () => {
      const departments = await getDepts();
      return departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));
    },
  },
];

// Prompt user for input
async function promptUser() {
  welcomeMessage();
  let isActive = true;
  while (isActive) {
    try {
      const answers = await inquirer.prompt(welcomeQueries);
      await checkAnswer(answers);
    } catch (error) {
      console.log(error);
    }
  }

  // Switch Case Logic
  async function checkAnswer(answers) {
    switch (answers.menu) {
      case "View All Employees":
        // Query database to view all employees
        await viewAllEmployees();

        break;

      case "View All Roles":
        // Query database to view all roles with department names
        await viewAllRoles();
        break;

      case "View All Departments":
        // Query database to view all departments
        await showAllDeparments();
        break;

      case "Add Employee":
        let employee = await inquirer.prompt([
          {
            type: "input",
            name: "first_name",//works
            message: "What is the employee's first name?",
            validate: (input) => {
              return validator.isEmpty(input) ? "First name is required" : true;
            }
          },
          {
            type: "input", //works
            name: "last_name",
            message: "What is the employee's last name?",
            validate: (input) => {
              return validator.isEmpty(input) ? "Last name is required" : true;
            }
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: async () => {
              const roles = await getRoles(); // works
              return roles.map((role) => ({
                name: role.title,
                value: role.id
              }));
            }
          }
        ]);// dept, salary, manager need to be added
        await addEmployee(employee);
        await viewAllEmployees();
        break;

      case "Add Role":
        let role = await inquirer.prompt(rolePrompt);
        await addRole(role);
        await viewAllRoles();
        break;

      case "Add Department":
        let department = await inquirer.prompt(departmentPrompt);
        await addDepartment(department);
        await showAllDeparments();
        break;

      case "Update Employee Role":
        console.log("Update employee role logic");
        isActive = false;
        await updateEmloyeeRole();
        break;

      case "EXIT":
        isActive = false; // Break while loop
        console.clear();
        console.log(
          "Thank you for using the employee management system! Goodbye!" + "\n"
        );
        process.exit(); // End node process

      default:
        throw new Error("Invalid selection");
    }
  }
}
promptUser();

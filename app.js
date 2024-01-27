const mysql = require("mysql2");
const inquirer = require("inquirer");
// const consoleTable = require("console.table");
const db = require("./lib/utils/config.js");
const {
  viewAllEmployees,
  showAllDeparments,
  viewAllRoles,
  addDepartment,
  addEmployee,
  addRole, viewAllDepts
} = require("./lib/utils/utils.js");
// require('dotenv').config();
// require("console.table");
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
      return validator.isNumeric(input)
      ? true
      : "Salary is required";
    },
  },
  {
    type: "list",
    name: "department_id",
    message: "What department id is associated with this role?",
    choices: async () => {
      const departments = await viewAllDepts();
      return departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));
    },
  }
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

  async function checkAnswer(answers) {
    // Switch Case Logic
    switch (answers.menu) {
      case "View All Employees":
        console.log("View All Employees logic");
        await viewAllEmployees();
        // Query database to select all employees
        break;

      case "View All Roles":
        console.log("View All Roles logic");
        await viewAllRoles();
        // Query database to select all roles
        break;

      case "View All Departments":
        console.log("View All Departments logic");
        await showAllDeparments();
        // Query database to select all departments
        break;

      case "Add Employee":
        console.log("Add employees logic");
        isActive = false;
        await addEmployee();
        break;

      case "Add Role":
        let role = await inquirer.prompt(rolePrompt);
        await addRole(role);
        await viewAllRoles();
        break;

      case "Add Department":
        console.log("Add department logic");
        // isActive = true;
        const departmentPrompt = [
          {
            type: "input",
            name: "name",
            message: "What is the name of the department?",
            validate: (input) => {
              return validator.isEmpty(input)
                ? "Department name is required"
                : true;
            },
          },
        ];
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
        console.log("Thank you for using the employee management system!");
        isActive = false; // break while loop
        console.clear();
        console.log(
          "Thank you for using the employee management system! Goodbye!" + "\n"
        );
        process.exit();
      // break; unneccesary for now since EXIT case ends while loop

      default:
        throw new Error("Invalid selection");
    }
  }
}
promptUser();

const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// require('dotenv').config();
// require("console.table");
// const validator = require("validator");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Office2023!",
  database: "company",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function selectAllEmployees() {
  db.query(`SELECT
  e.id, 
  e.first_name,
  e.last_name,
  r.title,
  d.name AS department, 
  r.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id 
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY department, salary DESC;
`, (err, results) => {
    if (err) throw err;
    // console.log("\n");
    // console.log(consoleTable.getTable(results));

    // Get the table as a string
    const tableString = consoleTable.getTable(results);
    // Calculate the width of the table
    const tableWidth = tableString.split("\n")[0].length;
    // Calculate the number of spaces needed for centering
    const spacesBefore = Math.floor((process.stdout.columns - tableWidth) / 2);
    // Add spaces before the entire table, including headers
    console.log('\n' + '\n' +
      " ".repeat(spacesBefore) +
        tableString.replace(/\n/g, "\n" + " ".repeat(spacesBefore)) + '\n'
    );
  });
}
function selectAllDeparments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.log("\n" + consoleTable.getTable(results));
  });
}
function selectAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.log("\n" + consoleTable.getTable(results));
  });
}



//   db.query('INSERT INTO {db} SET ?', data, (err, results) => {
//     if(err) throw err;
//     res.send('Values Inserted');
//   });

//   db.query('UPDATE {db} SET ? WHERE id = ?', [data, id], (err, results) => {
//     if(err) throw err;
//     res.send('Values Updated');
//   });
const welcomeMessage = () => {
  console.log('\n' + 'Welcome to the company database!'+ '\n');
};
const welcomeQueries = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do today?" + '\n',
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
]

// Prompt user for input
async function promptUser() {
  welcomeMessage();
  let repeat = true;
  while (repeat) {
    // console.clear();
    try {
      const answers = await inquirer.prompt(welcomeQueries);
      checkAnswer(answers);
    } catch (error) {
      console.log(error);
    }
  }

  function checkAnswer(answers) {
    // Switch Case Logic
    switch (answers.menu) {
      case "View All Employees":
        console.log("View All Employees logic");
        selectAllEmployees();
        // Query database to select all employees
        break;

      case "View All Roles":
        console.log("View All Roles logic");
        selectAllRoles();
        // Query database to select all roles
        break;

      case "View All Departments":
        console.log("View All Departments logic");
        selectAllDeparments();
        // Query database to select all departments
        break;

      case "Add Employee":
        console.log("Add employees logic");
        break;

      case "Add Role":
        console.log("Add roles logic");
        break;

      case "Add Department":
        console.log("Add department logic");
        break;

      case "Update Employee Role":
        console.log("Update employee role logic");
        break;

      case "EXIT":
        console.log("Thank you for using the employee management system!");
        repeat = false; // break while loop
        break;

      default:
        throw new Error("Invalid selection");
    }
  }
}
promptUser();

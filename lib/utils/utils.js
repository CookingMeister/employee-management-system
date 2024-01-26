const db = require('./config.js');
const consoleTable = require("console.table");

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

  module.exports = {
    selectAllEmployees,
    selectAllDeparments,
    selectAllRoles
  }
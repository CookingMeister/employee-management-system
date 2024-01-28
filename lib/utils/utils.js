const db = require("./config.js");
const consoleTable = require("console.table");

const centerTable = (results) => {
  // Get the table as a string
  const tableString = consoleTable.getTable(results);
  // Calculate the width of the table
  const tableWidth = tableString.split("\n")[0].length;
  // Calculate the number of spaces needed for centering
  const spacesBefore = Math.floor((process.stdout.columns - tableWidth) / 2);
  // Add spaces before the entire table, including headers
  console.log("\n" + " ".repeat(spacesBefore) + tableString.replace(/\n/g, "\n" + " ".repeat(spacesBefore)));
}

const viewAllEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT e.id, e.first_name, e.last_name, r.title,
       d.name AS department, r.salary,
       CONCAT(m.first_name, ' ', m.last_name) AS manager
       FROM employee e
       LEFT JOIN role r ON e.role_id = r.id
       LEFT JOIN department d ON r.department_id = d.id 
       LEFT JOIN employee m ON e.manager_id = m.id
       ORDER BY department, salary DESC;`,
      (err, results) => {
        if (err) reject(err);
        centerTable(results);
        resolve();
      }
    );
  });
};
const getDepts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM department", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
const getRoles = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM role", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
const getEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM employee", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
const showAllDeparments = () => {
  return new Promise((resolve) => {
    db.query("SELECT * FROM department", (err, results) => {
      if (err) reject(err);
      centerTable(results);
      resolve(results);
    });
  });
};
const addEmployee = (employee) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO employee SET ?", employee, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
const addDepartment = (department) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO department SET ?", department, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
const addRole = (role) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO role SET ?", role, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const viewAllRoles = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT r.title, r.id, d.name AS department, r.salary
      FROM role r
      JOIN department d ON r.department_id = d.id;
      `,
      (err, results) => {
        if (err) reject(err);
        centerTable(results);
        resolve(results);
      }
    );
  });
};
const updateRole = (employ, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE employee SET role_id = ? WHERE id = ?`,
      [role, employ],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

module.exports = {
  viewAllEmployees,
  showAllDeparments,
  viewAllRoles,
  addEmployee,
  addDepartment,
  addRole,
  getDepts,
  getRoles,
  getEmployees,
  updateRole,
};

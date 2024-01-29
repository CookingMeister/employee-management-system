const db = require('./config.js');
const consoleTable = require('console.table');

// Center table function
const centerTable = (results) => {
  const tableString = consoleTable.getTable(results);  // Get the table as a string
  const tableWidth = tableString.split('\n')[0].length;  // Calc the width of the table
  const spaces = Math.floor((process.stdout.columns - tableWidth) / 2); // Calc the number of spaces to center table
  console.log('\n' + ' '.repeat(spaces) + tableString.replace(/\n/g, '\n' + ' '.repeat(spaces))); // Add space around the entire table
}

// View all employees with role, dept, salary and manager, ordered by dept and salary
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
        centerTable(results);  // Table
        resolve();
      }
    );
  });
};

// View employees by Manager, ordered by dept and salary
const viewEmByManager = (m_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name,
      CONCAT(m.first_name, ' ', m.last_name) AS manager,
      r.title, d.name AS department, r.salary
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE e.manager_id = ?
      ORDER BY department, salary DESC;`,
      [m_id],
      (err, results) => {
        if (err) reject(err);
        // If manager_id does not exist, AKA is not a Manager
        !results.length
          ? console.log('\nThis employee is not a Manager.\n')
          : centerTable(results);
        resolve();
      }
    );
  });
};

// View employees by Department, ordered by dept and salary
const viewEmByDept = (d_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title,
       d.name AS department, r.salary
       FROM employee e
       LEFT JOIN role r ON e.role_id = r.id
       LEFT JOIN department d ON r.department_id = d.id
       WHERE r.department_id = ?
       ORDER BY department, salary DESC;`,
      [d_id],
      (err, results) => {
        if (err) reject(err);
        centerTable(results);
        resolve();
      }
    );
  });
};

// Select all Departments
const getDepts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Select all Roles
const getRoles = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM role', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Select all Employees
const getEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM employee', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// View all departments
const viewAllDeparments = () => {
  return new Promise((resolve) => {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) reject(err);
      centerTable(results);
      resolve(results);
    });
  });
};

// Add Employee to employee table
const addEmployee = (employee) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO employee SET ?', employee, (err, results) => {
      if (err) reject(err);
      console.log(
        `\nAdded employee: ${employee.first_name} ${employee.last_name} successfully!\n`
      );
      resolve(results);
    });
  });
};

// Add Department
const addDepartment = (department) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO department SET ?', department, (err, results) => {
      if (err) reject(err);
      console.log(`\nAdded department: ${department.name} successfully!\n`); // works
      resolve(results);
    });
  });
};

// Add Role
const addRole = (role) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO role SET ?', role, (err, results) => {
      if (err) reject(err);
      console.log(`\nAdded role: ${role.title} successfully!\n`); // works
      resolve(results);
    });
  });
};

// View all roles
const viewAllRoles = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT r.id, r.title, d.name AS department, r.salary
      FROM role r
      JOIN department d ON r.department_id = d.id;`,
      (err, results) => {
        if (err) reject(err);
        centerTable(results);
        resolve(results);
      }
    );
  });
};

// Update employee role
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

// Update employee manager
const updateManager = (employee, manager) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE employee SET manager_id = ? WHERE id = ?`,
      [manager, employee],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

// View department budgets
const getBudgetByDept = (dept) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT d.name as department, SUM(r.salary) AS budget
      FROM employee e
      JOIN role r ON e.role_id = r.id 
      JOIN department d ON r.department_id = d.id
      WHERE r.department_id = ?
      GROUP BY d.name;
      `,
      [dept],
      (err, results) => {
        if (err) reject(err);
        centerTable(results);
        resolve(results);
      }
    );
  });
};

// View total department budgets
const getBudgetTotal = () => {
  return new Promise((resolve, reject) => {
     db.query(
    `SELECT d.name AS department, SUM(r.salary) AS budget
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    GROUP BY d.name
    
    UNION
    
    SELECT 'All Departments' AS department, SUM(r.salary) AS budget
    FROM employee e
    JOIN role r ON e.role_id = r.id;
    `,
      (err, results) => {
        if (err) reject(err);
        centerTable(results);
        resolve(results);
      }
    );
  });
};

// Delete employee, role or department from table by id
const deleteItem = (table, id) => {
  const lowerTable = table.toLowerCase(); // match lowercase of db table names
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM ${lowerTable} WHERE id = ?`, [id], (err, results) => {
      if (err) reject(err);
      console.log(`\nDeleted item from ${table}\n`);
      resolve(results);    
    });
  });
};

module.exports = {
  viewAllEmployees,
  viewAllDeparments,
  viewAllRoles,
  viewEmByManager,
  viewEmByDept,
  addEmployee,
  addDepartment,
  addRole,
  getDepts,
  getRoles,
  getEmployees,
  updateRole,
  updateManager,
  getBudgetByDept,
  getBudgetTotal,
  deleteItem
};

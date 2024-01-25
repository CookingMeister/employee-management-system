// const mysql = require('mysql2');
const inquirer = require('inquirer');
const validator = require('validator');


// Middleware
// app.use(bodyparser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyparser.urlencoded({extended: true}));

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Office2024!',
//     database: 'office',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

// app.get('/', (req, res) => {
//   db.query('SELECT * FROM {db}', (err, results) => {
//     if(err) throw err;
//     res.json(results.row);
//   });
// });

// app.post('/', (req, res) => {
//   const data = req.body;
//   db.query('INSERT INTO {db} SET ?', data, (err, results) => {
//     if(err) throw err;
//     res.send('Values Inserted');
//   });
// });

// app.put('/', (req, res) => {
//   const data = req.body;
//   const id = req.params.id;
//   db.query('UPDATE {db} SET ? WHERE id = ?', [data, id], (err, results) => {
//     if(err) throw err;
//     res.send('Values Updated');
//   });
// });

// Prompt user for input
async function promptUser() {
  try {
    let repeat = true;
    while (repeat) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "menu",
          message: "What would you like to do?",
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
      ]);
      // Switch Case Logic
      switch (answers.menu) {
        case "View All Employees":
          console.log("View All Employees logic");
          break;
        case "View All Roles":
          console.log("View All Roles logic");
          break;
        case "View All Departments":
          console.log("View All Departments logic");
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
          repeat = false;
          break;

        default:
          return "invalid selection";
      }
    }
  } catch (err) {
    console.log("oops", err);
    throw err;
  }
}
promptUser();
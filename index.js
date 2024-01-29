const inquirer = require("inquirer");
const validator = require("validator");

const {
  viewAllEmployees,
  viewAllDeparments,
  viewAllRoles,
  viewEmByManager,
  viewEmByDept,
  addDepartment,
  addEmployee,
  addRole,
  getDepts,
  getEmployees,
  getRoles,
  updateRole, updateManager, getBudgetByDept, getBudgetTotal, deleteItem,
} = require("./lib/utils/utils.js");

const welcomeMessage = () => {
  console.log("\nWelcome to the company database!\n");
};
const menuQueries = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do today?\n",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",
      'Update Employee Manager',
      "View Employees by Manager",
      "View Employees by Department",
      'View Budget',
      "Delete Item",
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
const deptListPrompt = [
  {
    type: "list",
    name: "d_id",
    message: "What department is the employee in?",
    choices: async () => {
      const depts = await getDepts();
      return depts.map((dept) => ({
        name: dept.name,
        value: dept.id,
      }));
    },
  },
];
const rolePrompt = [
  {
    type: "input",
    name: "title",
    message: "What is the name of the role?",
    validate: (input) => {
      return validator.isEmpty(input) ? "Role name is required" : true;
    },
  },
  {
    type: "input",
    name: "salary",
    message: "How much is the salary?",
    validate: (input) => {
      return validator.isEmpty(input)
        ? "Salary is required"
        : !validator.isNumeric(input)
        ? "Salary must be numeric"
        : true;
    },
  },
  {
    type: "list",
    name: "department_id",
    message: "What department is associated with this role?",
    choices: async () => {
      const departments = await getDepts();
      return departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));
    },
  },
];
const employPrompt = [
  {
    type: "input",
    name: "first_name", //works
    message: "What is the employee's first name?",
    validate: (input) => {
      return validator.isEmpty(input) ? "First name is required" : true;
    },
  },
  {
    type: "input", //works
    name: "last_name",
    message: "What is the employee's last name?",
    validate: (input) => {
      return validator.isEmpty(input) ? "Last name is required" : true;
    },
  },
  {
    type: "list",
    name: "role_id",
    message: "What is the employee's role?",
    choices: async () => {
      const roles = await getRoles(); // works
      return roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));
    },
  },
  {
    type: "list",
    name: "manager_id",
    message: "Who is the employee's manager?",
    choices: async () => {
      const manager = await getEmployees();
      const choices = manager.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      choices.push({ name: "NONE", value: null });
      return choices;
    },
    default: null,
  },
];
const managerPrompt = [
  {
    type: "list",
    name: "m_id",
    message: "Who is the manager?",
    choices: async () => {
      const manager = await getEmployees();
      return manager.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
    },
  },
];
const emRolePrompt = [
  {
    type: "list",
    name: "employee",
    message: "Which employee's role do you want to update?",
    choices: async () => {
      const employees = await getEmployees();
      return employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
    },
  },
];
const updateRolePrompt = [
  {
    type: "list",
    name: "role",
    message: "What is the employee's new role?",
    choices: async () => {
      const roles = await getRoles();
      return roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));
    },
  },
];
const updateManagerPrompt = [
  {
    type: "list",
    name: "id",
    message: "Which employee's manager do you want to update?",
    choices: async () => {
      const em = await getEmployees();
      return em.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
    },
  },
  {
    type: "list",
    name: "manager",
    message: "Who do you want to assign as the new manager?",
    choices: async () => {
      const managers = await getEmployees();
      return managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
      }));
    }
  }
];
const deletePrompt = [
  {
    type: "list",
    name: "item",
    message: "What would you like to delete?",
    choices: ["Employee", "Role", "Department"],
  },
  {
    type: "list",
    name: "id",
    message: "What is the item you want to delete?",
    choices: async (answer) => {
      const lower = answer.item.toLowerCase(); // Convert to lowercase
      switch(lower) {
        case "employee":
          const employees = await getEmployees();
          return employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }));
        case "role":
          const roles = await getRoles();
          return roles.map((role) => ({
            name: role.title,
            value: role.id
          }));
        case "department":
          const departments = await getDepts();
          return departments.map((department) => ({
            name: department.name,
            value: department.id
          }));
          default:
            return [];
      }
    }
  },
];

// Welcome and Prompt user for input
const init = async () => {
  welcomeMessage();
  let isActive = true;
  while (isActive) {
    try {
      const answers = await inquirer.prompt(menuQueries);
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
        await viewAllDeparments();
        break;

      case "Add Employee":
        let employee = await inquirer.prompt(employPrompt);
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
        await viewAllDeparments();
        break;

      case "Update Employee Role":
        const updateEm = await inquirer.prompt(emRolePrompt);
        const upRole = await inquirer.prompt(updateRolePrompt);
        await updateRole(updateEm.employee, upRole.role);
        await viewAllEmployees();
        break;

      case "Update Employee Manager":
        const updateMan = await inquirer.prompt(updateManagerPrompt);
        await updateManager(updateMan.id, updateMan.manager);
        await viewEmByManager(updateMan.manager);
        break;

      case "View Employees by Manager":
        // Query database to view all employees by manager
        const man = await inquirer.prompt(managerPrompt);
        await viewEmByManager(man.m_id);
        break;

      case "View Employees by Department":
        // Query database to view all employees by department
        const dept = await inquirer.prompt(deptListPrompt);
        await viewEmByDept(dept.d_id);
        break;

      case "Delete Item":
        // Prompt user to select item to delete
        isActive = false;
        const toDelete = await inquirer.prompt(deletePrompt);        
        await deleteItem(toDelete.item, toDelete.id);
        // Which table to view based on deletion criteria
        toDelete.item === 'Employee'
          ? await viewAllEmployees()
          : toDelete.item === 'Role'
          ? await viewAllRoles()
          : await viewAllDeparments();
        isActive = true;
        break;

      case "View Budget":
        // Query database to view total utilized budget by department
        const answers = await inquirer.prompt({
          type: 'list',
          name: 'department',
          message: 'Which department budget do you want to view?',
          choices: async () => {
            const departments = await getDepts();
            const choices = departments.map(department => ({
              name: department.name,
              value: department.id
            }));
            choices.push({ name: "All Departments", value: "all" });
            return choices;
          }
        });
        console.log(answers.department);
        (await answers.department) === "all"
          ? getBudgetTotal()
          : getBudgetByDept(answers.department);
        break;
       
      case "EXIT":
        isActive = false; // Break while loop
        console.clear();
        console.log(
          '\nThank you for using the employee management system! Goodbye!\n'
        );
        process.exit(); // End node process

      default:
        throw new Error('Invalid selection');
    }
  }
};
// Initialize App
init();

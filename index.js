const inquirer = require('inquirer');
// const validator = require('validator');

const {
  viewAllEmployees,
  viewAllDeparments,
  viewAllRoles,
  viewEmByManager,
  viewEmByDept,
  addDepartment,
  addEmployee,
  addRole,
  updateRole,
  updateManager,
  getBudgetByDept,
  getBudgetTotal,
  deleteItem
} = require('./lib/utils/utils.js');

const { 
  menuQueries,
  departmentPrompt,
  deptListPrompt,
  rolePrompt,
  employPrompt,
  managerPrompt,
  emRolePrompt,
  updateRolePrompt,
  updateManagerPrompt,
  budgetPrompt,
  deletePrompt
} = require('./lib/utils/queries.js');

const welcomeMessage = () => {
  console.log('\nWelcome to the company database!\n');
};


// Welcome and Prompt user for input
const init = async () => {
  welcomeMessage();
  let isActive = true;  // Loop through prompts while active is true
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
      case 'View All Employees':
        // Query database to view all employees
        await viewAllEmployees();
        break;

      case 'View All Roles':
        // Query db to view all roles
        await viewAllRoles();
        break;

      case 'View All Departments':
        // Query db to view all departments
        await viewAllDeparments();
        break;

      case 'Add Employee':
        // Query db to Insert new employee
        let employee = await inquirer.prompt(employPrompt);
        await addEmployee(employee);
        await viewAllEmployees();
        break;

      case 'Add Role':
        // Query db to Insert new role
        let role = await inquirer.prompt(rolePrompt);
        await addRole(role);
        await viewAllRoles();
        break;

      case 'Add Department':
        // Query db to Insert new department
        let department = await inquirer.prompt(departmentPrompt);
        await addDepartment(department);
        await viewAllDeparments();
        break;

      case 'Update Employee Role':
        // Query db to update employee role
        const updateEm = await inquirer.prompt(emRolePrompt);
        const upRole = await inquirer.prompt(updateRolePrompt);
        await updateRole(updateEm.employee, upRole.role);
        await viewAllEmployees();
        break;

      case 'Update Employee Manager':
        // Query db to update employee manager
        const updateMan = await inquirer.prompt(updateManagerPrompt);
        await updateManager(updateMan.id, updateMan.manager);
        await viewEmByManager(updateMan.manager);
        break;

      case 'View Employees by Manager':
        // Query db to view all employees by manager
        const man = await inquirer.prompt(managerPrompt);
        await viewEmByManager(man.m_id);
        break;

      case 'View Employees by Department':
        // Query db to view all employees by department
        const dept = await inquirer.prompt(deptListPrompt);
        await viewEmByDept(dept.d_id);
        break;

      case 'Delete Item':
        // Prompt user to select item to delete
        const toDelete = await inquirer.prompt(deletePrompt);
        if (toDelete.item === 'Go Back') {
          break;  // if go back, break out of switch
        }
        await deleteItem(toDelete.item, toDelete.id);
        // Which table to view based on deletion criteria
        toDelete.item === 'Employee'
          ? await viewAllEmployees()
          : toDelete.item === 'Role'
          ? await viewAllRoles()
          : await viewAllDeparments();
        break;

      case 'View Budget':
        // Query db to view total utilized budget by dept, or by all depts
        const answers = await inquirer.prompt(budgetPrompt);
        (await answers.department) === 'all'  // Check if viewing all depts or single dept budget
          ? await getBudgetTotal()
          : await getBudgetByDept(answers.department);
        break;

      // EXIT program
      case 'EXIT':
        isActive = false; // Break while loop
        console.clear();
        console.log('\nThank you for using the employee management system! Goodbye!\n');
        process.exit(); // End node process

      default:
        throw new Error('Invalid selection');
    }
  }
};

// Initialize App
init();

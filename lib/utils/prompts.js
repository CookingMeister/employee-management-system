const validator = require('validator');
const { getDepts,
        getEmployees,
        getRoles } = require('./utils.js');

// Main Menu
const menuQueries = [
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do today?\n',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'View Budget',
        'Delete Item',
        'EXIT',
      ],
    },
  ];
  // Department Prompt
  const departmentPrompt = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: (input) => {
        return validator.isEmpty(input) ? 'Department name is required' : true;
      },
    },
  ];
  // Get Dept List
  const deptListPrompt = [
    {
      type: 'list',
      name: 'd_id',
      message: 'What department is the employee in?',
      choices: async () => {
        const depts = await getDepts();
        return depts.map((dept) => ({ // Generate dept list
          name: dept.name,
          value: dept.id,
        }));
      },
    },
  ];
  // Role Prompt
  const rolePrompt = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?',
      validate: (input) => {
        return validator.isEmpty(input) ? 'Role name is required' : true;
      },
    },
    {
      type: 'input',
      name: 'salary',
      message: 'How much is the salary?',
      validate: (input) => {
        return validator.isEmpty(input) // is a value
          ? 'Salary is required'
          : !validator.isNumeric(input) // is a number
          ? 'Salary must be numeric'
          : true;
      },
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'What department is associated with this role?',
      choices: async () => {
        const departments = await getDepts();
        return departments.map((department) => ({ // Generate dept list
          name: department.name,
          value: department.id,
        }));
      },
    },
  ];
  // Add Employee Prompt
  const employPrompt = [
    {
      type: 'input',
      name: 'first_name',
      message: `What is the employee's first name?`,
      validate: (input) => {
        return validator.isEmpty(input) ? 'First name is required' : true;
      },
    },
    {
      type: 'input',
      name: 'last_name',
      message: `What is the employee's last name?`,
      validate: (input) => {
        return validator.isEmpty(input) ? 'Last name is required' : true;
      },
    },
    {
      type: 'list',
      name: 'role_id',
      message: `What is the employee's role?`,
      choices: async () => {
        const roles = await getRoles();
        return roles.map((role) => ({ // Generate role list
          name: role.title,
          value: role.id,
        }));
      },
    },
    {
      type: 'list',
      name: 'manager_id',
      message: `Who is the employee's manager?`,
      choices: async () => {
        const manager = await getEmployees();
        const choices = manager.map((employee) => ({ // Generate Manager name from id list
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
        choices.push({ name: 'NONE', value: null });
        return choices;
      },
      default: null,
    },
  ];
  // List Manager
  const managerPrompt = [
    {
      type: 'list',
      name: 'm_id',
      message: 'Who is the manager?',
      choices: async () => {
        const manager = await getEmployees();
        return manager.map((employee) => ({  // Manager list
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
      },
    },
  ];
  // Update Employee's Role
  const emRolePrompt = [
    {
      type: 'list',
      name: 'employee',
      message: `Which employee's role do you want to update?`,
      choices: async () => {
        const employees = await getEmployees();
        return employees.map((employee) => ({  // Generate employee list
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
      },
    },
  ];
  // New Role to add
  const updateRolePrompt = [
    {
      type: 'list',
      name: 'role',
      message: `What is the employee's new role?`,
      choices: async () => {
        const roles = await getRoles();
        return roles.map((role) => ({  // Role list
          name: role.title,
          value: role.id,
        }));
      },
    },
  ];
  // Update Employee's Manager
  const updateManagerPrompt = [
    {
      type: 'list',
      name: 'id',
      message: `Which employee's manager do you want to update?`,
      choices: async () => {
        const em = await getEmployees();
        return em.map((employee) => ({ // Employee list
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
      },
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who do you want to assign as the new manager?',
      choices: async () => {
        const managers = await getEmployees();
        return managers.map((manager) => ({ // Manager list
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id
        }));
      }
    }
  ];
  // Get Budget Prompt
  const budgetPrompt = [
    {
      type: 'list',
      name: 'department',
      message: 'Which department budget do you want to view?',
      choices: async () => {
        const departments = await getDepts();
        const choices = departments.map(department => ({ // Each Dept list, including 'All'
          name: department.name,
          value: department.id
        }));
        choices.push({ name: 'All Departments', value: 'all' });
        return choices;
      }
    }
  ];
  // Delete items Prompt
  const deletePrompt = [
    {
      type: 'list',
      name: 'item',
      message: 'What would you like to delete?',
      choices: ['Employee', 'Role', 'Department', 'Go Back'],
    },
    {
      type: 'list',
      name: 'id',
      message: 'What is the item you want to delete?',
      choices: async (answer) => {
        const lower = answer.item.toLowerCase(); // Convert to lowercase
        switch(lower) {
          case 'employee':
            const employees = await getEmployees();
            return employees.map((employee) => ({  // Employee list
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }));
          case 'role':
            const roles = await getRoles();
            return roles.map((role) => ({  // Role list
              name: role.title,
              value: role.id
            }));
          case 'department':
            const departments = await getDepts();
            return departments.map((department) => ({  // Dept list
              name: department.name,
              value: department.id
            }));

          default:
            return [];
        }
      },  // If 'go back' was chosen, don't show next prompt (using 'when' condition)
      when: (deletePrompt) => deletePrompt.item !== 'Go Back',
      default: null,
    },
  ];

  module.exports = {
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
  };
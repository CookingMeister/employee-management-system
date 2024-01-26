DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON UPDATE CASCADE ON DELETE SET NULL
);
--view all employees--
--aliases--
SELECT 
  e.id,
  e.first_name, 
  e.last_name,
  r.title,
  d.name AS department,
  r.salary,
  m.first_name AS manager_first_name, 
  m.last_name AS manager_last_name
FROM employee e
LEFT JOIN role r ON e.role_id = r.id  
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;


DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;
--create department table--
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);
--create role table--
CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);
--create employee table--
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

--aliases--



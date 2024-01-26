USE company;

INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Consulting'), ('Accounting'), ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 90000, 1), ('Lead Engineer', 120000, 1), ('Sales Rep', 90000, 2),('Accountant', 60000, 4), ('Consultant', 90000, 3), ('Division President', 150000, 5), ('Division V.P.', 130000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Peter', 'Gibbons', 2), 
       ('Nina', 'Something', 4),
       ('Bill', 'Lumberg', 7),
       ('Michael', 'Bolton', 1),
       ('Samir', 'Nagheenanajar', 1),
       ('Bob', 'Slydell', 5),
       ('Bob', 'Porter', 5),
       ('Drew', 'Something', 1),
       ('Milton', 'Waddems', 1),
       ('Tom', 'Smykowski', 3),
       ('Dom', 'Portwood', 6);

UPDATE employee SET manager_id = 3 WHERE id = 1;
UPDATE employee SET manager_id = 3 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 3 WHERE id = 5;
UPDATE employee SET manager_id = 11 WHERE id = 6;
UPDATE employee SET manager_id = 11 WHERE id = 7;
UPDATE employee SET manager_id = 3 WHERE id = 8;
UPDATE employee SET manager_id = 3 WHERE id = 9;
UPDATE employee SET manager_id = 3 WHERE id = 10;
UPDATE employee SET manager_id = 11 WHERE id = 3;

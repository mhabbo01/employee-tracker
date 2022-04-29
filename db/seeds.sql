USE employee_tracker_db;


INSERT INTO department(dept_name)
VALUES
('Sales'),
('Marketing'),
('Engineering'),
('Finance'),
('Legal');


INSERT INTO roles(title, salary, dept_id)
VALUES
('Account Sales Rep', 70000, 1),
('Digital Sales Rep', 80000, 1),
('Marketing Rep', 80000, 2),
('Sales Manager', 90000, 1),
('Marketing Manager', 95000, 2),
('Software Engineer', 93000, 3),
('Engineering Manager', 110000, 3),
('Accountant', 75000, 4),
('Accounting Manager', 90000, 4),
('Lawyer', 125000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Lebron', 'James', 1, 4),
('Dwyane', 'Wade', 2, 4),
('Chris', 'Bosh', 3, 5),
('Pat', 'Riley', 4, NULL),
('Erik', 'Spo', 5, NULL),
('Jose', 'Canseco', 6, 7),
('Joe', 'Torre', 7, NULL),
('Alex', 'Rodriguez', 8, 9),
('Derek', 'Jeter', 9, NULL),
('Robert', 'Kardashian', 10, NULL);



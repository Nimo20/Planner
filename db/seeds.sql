INSERT INTO Departments (department_id, department_name) VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'Finance');


INSERT INTO Roles (role_id, title, department_id, salary) VALUES
(1, 'Developer', 1, 60000),
(2, 'Manager', 2, 70000),
(3, 'Accountant', 3, 65000);


INSERT INTO Employees (employee_id, name, title, department_id, salary, manager_id) VALUES
(1, 'John Doe', 'Developer', 1, 60000, NULL),
(2, 'Jane Smith', 'Manager', 2, 70000, NULL),
(3, 'Alice Johnson', 'Developer', 1, 55000, 2),
(4, 'Bob Brown', 'Accountant', 3, 65000, 2);
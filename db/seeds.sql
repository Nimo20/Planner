INSERT INTO departments (name) VALUES
('Sales'),
('Marketing'),
('Finance'),
('Engineering');

INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 60000.00, 1),
('Sales Representative', 40000.00, 1),
('Marketing Manager', 65000.00, 2),
('Marketing Specialist', 45000.00, 2),
('Financial Analyst', 55000.00, 3),
('Accountant', 48000.00, 3),
('Software Engineer', 70000.00, 4),
('Web Developer', 60000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Alice', 'Smith', 2, 1),
('Bob', 'Johnson', 3, NULL),
('Sarah', 'Williams', 4, 3),
('Michael', 'Brown', 5, NULL),
('Emily', 'Jones', 6, 5),
('David', 'Davis', 7, NULL),
('Laura', 'Miller', 8, 7);
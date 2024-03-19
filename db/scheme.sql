CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255)
);

CREATE TABLE Roles (
    role_id INT PRIMARY KEY,
    title VARCHAR(255),
    department_id INT,
    salary DECIMAL(10, 2),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(255),
    title VARCHAR(255),
    department_id INT,
    salary DECIMAL(10, 2),
    manager_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (manager_id) REFERENCES Employees(employee_id)
);